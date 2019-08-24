//         ATMEL Microcontroller Software Support  -  Colorado Springs, CO -
// ----------------------------------------------------------------------------
// DISCLAIMER:  THIS SOFTWARE IS PROVIDED BY ATMEL "AS IS" AND ANY EXPRESS OR
// IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT ARE
// DISCLAIMED. IN NO EVENT SHALL ATMEL BE LIABLE FOR ANY DIRECT, INDIRECT,
// INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
// OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
// LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
// EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
// ----------------------------------------------------------------------------

/** \file
 *  \brief  Functions for I2C Physical Hardware Independent Layer of ECCX08 Library
 *  \author Atmel Crypto Products
 *  \date   May 3, 2013
 */
//#define ECCX08_GPIO_WAKEUP
#include <string.h>
#include <Arduino.h>
#include <Wire.h>

#include "eccX08_config.h"
#include "eccX08_lib_return_codes.h"
#include "eccX08_physical.h"

// error codes for physical hardware dependent module
// Codes in the range 0x00 to 0xF7 are shared between physical interfaces (SWI, TWI, SPI).
// Codes in the range 0xF8 to 0xFF are special for the particular interface.
#define I2C_FUNCTION_RETCODE_SUCCESS     ((uint8_t) 0x00) //!< Communication with device succeeded.
#define I2C_FUNCTION_RETCODE_COMM_FAIL   ((uint8_t) 0xF0) //!< Communication with device failed.
#define I2C_FUNCTION_RETCODE_NACK        ((uint8_t) 0xF8) //!< TWI nack

/** \brief This enumeration lists all packet types sent to a ECCX08 device.
 *
 * The following byte stream is sent to a ECCX08 I2C device:
 *    {I2C start} {I2C address} {word address} [{data}] {I2C stop}.
 * Data are only sent after a word address of value #ECCX08_I2C_PACKET_FUNCTION_NORMAL.
 */
enum i2c_word_address
{
	ECCX08_I2C_PACKET_FUNCTION_RESET,	//!< Reset device.
	ECCX08_I2C_PACKET_FUNCTION_SLEEP,	//!< Put device into Sleep mode.
	ECCX08_I2C_PACKET_FUNCTION_IDLE,	//!< Put device into Idle mode.
	ECCX08_I2C_PACKET_FUNCTION_NORMAL	//!< Write / evaluate data that follow this word address byte.
};


/** \brief This enumeration lists flags for I2C read or write addressing. */
enum i2c_read_write_flag
{
	I2C_WRITE = (uint8_t) 0x00,		//!< write command flag
	I2C_READ  = (uint8_t) 0x01		//!< read command flag
};


//! I2C address is set when calling #eccX08p_init or #eccX08p_set_device_id.
static uint8_t device_address;
static uint32_t device_speed = 100000u;

static uint8_t eccX08p_i2c_endTransmission();


/** \brief This I2C function initializes the hardware.
 */
void eccX08p_init(void)
{
	Wire.begin();
	Wire.setClock(device_speed);
	device_address = ECCX08_I2C_DEFAULT_ADDRESS;
}


/** \brief This I2C function initializes the i2c speed.
 */
void eccX08p_i2c_set_spd(uint32_t spd_in_khz)
{
	device_speed = spd_in_khz * 1000U;
	Wire.setClock(device_speed);
}


//#ifndef DEBUG_DIAMOND
//#   define DEBUG_DIAMOND
//#endif
/** \brief This I2C function generates a Wake-up pulse and delays.
 * \return status of the operation
 */
uint8_t eccX08p_wakeup(void)
{
	uint8_t ret_code = ECCX08_SUCCESS;

	//set 100kHz speed
	Wire.setClock( 90000u );

	/* send 0 address */
	Wire.beginTransmission( 0 );
	(void)Wire.endTransmission();

	/* set original speed */
	Wire.setClock( device_speed );

	delayMicroseconds( ECCX08_WAKEUP_DELAY * 10u );

	return ret_code;
}


static uint8_t eccX08p_i2c_endTransmission() {
	uint8_t success = I2C_FUNCTION_RETCODE_SUCCESS;
	uint8_t ret_code;

	/*
	 * 0:success
	 * 1:data too long to fit in transmit buffer
	 * 2:received NACK on transmit of address
	 * 3:received NACK on transmit of data
	 * 4:other error 
	 */
	if( ( ret_code = Wire.endTransmission() ) != 0 ) {
		success = I2C_FUNCTION_RETCODE_COMM_FAIL;
	}

	return success;
}


/** \brief This function sends a I2C packet enclosed by a I2C start and stop to a ECCX08 device.
 *
 *         This function combines a I2C packet send sequence that is common to all packet types.
 *         Only if word_address is #I2C_PACKET_FUNCTION_NORMAL, count and buffer parameters are
 *         expected to be non-zero.
 * @param[in] word_address packet function code listed in #i2c_word_address
 * @param[in] count number of bytes in data buffer
 * @param[in] buffer pointer to data buffer
 * @return status of the operation
 */
static uint8_t eccX08p_i2c_send(uint8_t word_address, uint8_t count, uint8_t *buffer)
{
	uint8_t i2c_status;

	Wire.beginTransmission( device_address );

	Wire.write(&word_address, 1);

	if (count != 0) {
		Wire.write(buffer, count);
	}

	i2c_status = eccX08p_i2c_endTransmission();

	if (i2c_status != I2C_FUNCTION_RETCODE_SUCCESS) {
		return ECCX08_COMM_FAIL;
	} else {
		return ECCX08_SUCCESS;
	}
}


/** \brief This I2C function sends a command to the device.
 * \param[in] count number of bytes to send
 * \param[in] command pointer to command buffer
 * \return status of the operation
 */
uint8_t eccX08p_send_command(uint8_t count, uint8_t *command)
{
	return eccX08p_i2c_send(ECCX08_I2C_PACKET_FUNCTION_NORMAL, count, command);
}


/** \brief This I2C function puts the ECCX08 device into idle state.
 * \return status of the operation
 */
uint8_t eccX08p_idle(void)
{
	return eccX08p_i2c_send(ECCX08_I2C_PACKET_FUNCTION_IDLE, 0, NULL);
}


/** \brief This I2C function puts the ECCX08 device into low-power state.
 *  \return status of the operation
 */
uint8_t eccX08p_sleep(void)
{
	return eccX08p_i2c_send(ECCX08_I2C_PACKET_FUNCTION_SLEEP, 0, NULL);
}


/** \brief This I2C function resets the I/O buffer of the ECCX08 device.
 * \return status of the operation
 */
uint8_t eccX08p_reset_io(void)
{
	return eccX08p_i2c_send(ECCX08_I2C_PACKET_FUNCTION_RESET, 0, NULL);
}


/** \brief This I2C function receives a response from the ECCX08 device.
 *
 * @param[in] size size of rx buffer
 * @param[out] response pointer to rx buffer
 * @return status of the operation
 */
uint8_t eccX08p_receive_response(uint8_t size, uint8_t *response)
{
	uint8_t error, count, i = 0u;

	// Address the device and indicate that bytes are to be read.
	// Receive count byte.
	Wire.requestFrom(device_address, size);

	error = Wire.lastError();

	if(error != I2C_ERROR_OK) {
		Serial.println("eccX08p_receive_response: i2c hal error " + String(Wire.getErrorText(error)));
	}

	if (Wire.available() != size) {
		Serial.println("eccX08p_receive_response: receive count byte failed. Available bytes: " + String(Wire.available()));
		return ECCX08_COMM_FAIL;
	}

	*response = Wire.read();
	count = response[ECCX08_BUFFER_POS_COUNT];

	if ((count < ECCX08_RSP_SIZE_MIN) || (count > size)) {
		Serial.println("eccX08p_receive_response: response invalid size. Count: " + String(count));
		return ECCX08_INVALID_SIZE;
	}

	while( Wire.available() ) {
		response[ECCX08_BUFFER_POS_DATA + i] = Wire.read();
		i++;
	}

	return ECCX08_SUCCESS;

}


/** \brief This I2C function resynchronizes communication.
 *
 * Parameters are not used for I2C.\n
 * Re-synchronizing communication is done in a maximum of three steps
 * listed below. This function implements the first step. Since
 * steps 2 and 3 (sending a Wake-up token and reading the response)
 * are the same for I2C and SWI, they are
 * implemented in the communication layer (#eccX08c_resync).
  <ol>
     <li>
       To ensure an IO channel reset, the system should send
       the standard I2C software reset sequence, as follows:
       <ul>
         <li>a Start condition</li>
         <li>nine cycles of SCL, with SDA held high</li>
         <li>another Start condition</li>
         <li>a Stop condition</li>
       </ul>
       It should then be possible to send a read sequence and
       if synchronization has completed properly the ATECCX08 will
       acknowledge the device address. The chip may return data or
       may leave the bus floating (which the system will interpret
       as a data value of 0xFF) during the data periods.\n
       If the chip does acknowledge the device address, the system
       should reset the internal address counter to force the
       ATECCX08 to ignore any partial input command that may have
       been sent. This can be accomplished by sending a write
       sequence to word address 0x00 (Reset), followed by a
       Stop condition.
     </li>
     <li>
       If the chip does NOT respond to the device address with an ACK,
       then it may be asleep. In this case, the system should send a
       complete Wake token and wait t_whi after the rising edge. The
       system may then send another read sequence and if synchronization
       has completed the chip will acknowledge the device address.
     </li>
     <li>
       If the chip still does not respond to the device address with
       an acknowledge, then it may be busy executing a command. The
       system should wait the longest TEXEC and then send the
       read sequence, which will be acknowledged by the chip.
     </li>
  </ol>
 * \param[in] size size of rx buffer
 * \param[out] response pointer to response buffer
 * \return status of the operation
 * \todo Run MAC test in a loop until a communication error occurs and this routine is executed.
 */
uint8_t eccX08p_resync(uint8_t size, uint8_t *response)
{
	//uint8_t nine_clocks = 0xFF;
	//uint8_t ret_code = i2c_send_start();

	// Do not evaluate the return code that most likely indicates error,
	// since nine_clocks is unlikely to be acknowledged.
	//(void) i2c_send_bytes(1, &nine_clocks);

	// Send another Start. The function sends also one byte,
	// the I2C address of the device, because I2C specification
	// does not allow sending a Stop right after a Start condition.
	//ret_code = eccX08p_send_slave_address(I2C_READ);

	// Send only a Stop if the above call succeeded.
	// Otherwise the above function has sent it already.
	//if (ret_code == I2C_FUNCTION_RETCODE_SUCCESS)
	//	ret_code = i2c_send_stop();

	// Return error status if we failed to re-sync.
	//if (ret_code != I2C_FUNCTION_RETCODE_SUCCESS)
	//	return ECCX08_COMM_FAIL;

	// Try to send a Reset IO command if re-sync succeeded.
	return eccX08p_reset_io();
}
