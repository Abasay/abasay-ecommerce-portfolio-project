import React, { useState } from 'react';
import contact from '../asset/contact2.jpg';
import { FaGithub } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { toastFunction } from '../utility/toastFunction';
import { RingLoader } from 'react-spinners';
import { FaChevronDown } from 'react-icons/fa';

const Contact = () => {
  const [details, setDetails] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    message: '',
  });
  const [edited, setEdited] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sennt, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, phoneNumber, email, message } = details;
    if (name && phoneNumber && email && message) {
      setEdited(true);
      setIsSending(true);
      setSent(false);
      setErrorMessage('');
      try {
        const request = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/contact-us`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(details),
          }
        );

        const response = await request.json();
        if (response.success) {
          setEdited(false);
          setIsSending(false);
          setSent(true);
          toastFunction('success', 'Message Sent!');
          setDetails({ name: '', phoneNumber: '', email: '', message: '' });
        } else {
          setEdited(false);
          setIsSending(false);
          toastFunction('error', 'Failed to send message');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toastFunction('error', 'Please fill all form.');
    }
  };
  return (
    <>
      {isSending && (
        <div className='text-center justify-center mx-auto max-w-md flex flex-row items-center bg-gray-100 my-10 rounded-full px-12 py-2'>
          <RingLoader size={40} color='lightblue' />
          <p className='text-2xl font-medium text-gray-500 pl-3 '>
            Sending your message.
          </p>
        </div>
      )}

      <section className=' p-3 grid grid-cols-2 gap-4 max-w-[900px] mx-auto mt-10 contact'>
        <div>
          <div className='flex flex-col'>
            <h1 className='font-bold text-3xl italic text-slate-500'>
              Contact Us!
            </h1>
            <div
              className=' border-b-8 border-r w-12 border-blue-400'
              style={{ borderRadius: '10px' }}
            ></div>
            <p className='my-4 text-blue-400 font-semibold text-xl'>
              Get in touch and let us know how we can help.
            </p>
          </div>
          <div className='my-8'>
            <form
              action=''
              className='flex flex-col gap-5'
              onSubmit={handleSubmit}
            >
              <input
                type='text'
                name='name'
                placeholder='Name'
                value={details.name}
                onChange={handleChange}
                disabled={edited && true}
                className='w-full text-blue-400 font-medium transition-all p-1 bg-gray-100 mt-1 mb-3 rounded-md pl-3 pb-2 focus-within:outline-none border-b-4  border-blue-500 '
              />
              <input
                type='number'
                name='phoneNumber'
                placeholder='Phone Number'
                value={details.phoneNumber}
                onChange={handleChange}
                disabled={edited && true}
                className='w-full text-blue-400 font-medium  transition-all p-1 bg-gray-100 mt-1 mb-3 rounded-md pl-3 pb-2 focus-within:outline-none border-b-4  border-blue-500'
              />
              <input
                type='email'
                name='email'
                placeholder='Email address'
                value={details.email}
                onChange={handleChange}
                disabled={edited && true}
                className='w-full text-blue-400 font-medium  bg-gray-100 transition-all p-1 mt-1 mb-3 rounded-md pl-3 pb-2 focus-within:outline-none border-b-4  border-blue-500'
              />
              <textarea
                type='text'
                rows={4}
                name='message'
                value={details.message}
                onChange={handleChange}
                disabled={edited && true}
                placeholder='Your message to us'
                className='w-full bg-gray-100 text-blue-400 font-medium  transition-all p-1 mt-1 mb-3 rounded-md pl-3 pb-2 focus-within:outline-none border-b-4  border-blue-500'
              ></textarea>
              <input
                type='submit'
                name='button'
                value='Submit'
                disabled={edited && true}
                className='w-full font-semibold text-xl text-white  bg-blue-600 transition-all p-1 rounded-full pl-3 pb-2 my-8 hover:bg-blue-50 hover:text-blue-600 hover:border hover:border-blue-400 '
              />
            </form>
            <div className='flex flex-row items-center w-20 mx-auto gap-3'>
              <span className='text-2xl font-medium text-blue-400'>OR</span>
              <FaChevronDown size={35} className='text-blue-400 mt-2' />
            </div>
            <div className='mt-8 w-full justify-center flex flex-row gap-6 mx-auto items-center'>
              <div>
                <a
                  href='https://www.github.com/Abasay'
                  className='flex flex-row items-center gap-3'
                >
                  <FaGithub size={25} color='#4078c0' />{' '}
                  <span className='font-medium text-gray-500 underline italic '>
                    Github
                  </span>
                </a>
              </div>
              <div>
                <a
                  href='https://www.linkedin.com/in/asheem-abdulsalam-133782153'
                  className='flex flex-row items-center gap-3'
                >
                  <FaLinkedin size={25} color='#0072B1' />
                  <span className='font-medium text-gray-500 underline italic '>
                    LinkedIn
                  </span>
                </a>
              </div>
              <div>
                <a
                  href='https://wa.me/+2348064611398'
                  className='flex flex-row items-center gap-3'
                >
                  <FaWhatsapp size={25} color='#075E54' />
                  <span className='font-medium text-gray-500 underline italic '>
                    Whatsapp
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-20 relative'>
          <img src={contact} alt='Contact us' width={500} height={500} />
          <p className='mt-36 flex  absolute right-0 flex-rows items-center gap-7 pl-14 text-2xl'>
            <p className='border border-blue-400 w-14'></p>
            <a href='tel:+2348064611398' className='text-blue-400'>
              +234 806 461 1398
            </a>
          </p>
        </div>
      </section>
    </>
  );
};

export default Contact;
