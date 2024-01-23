import React from 'react';
import profile from '../asset/profile1.jpg';
import { FaGithub } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

const About = () => {
  return (
    <>
      <section className=' p-3 grid grid-cols-2 gap-10 max-w-[900px] mx-auto mt-10 contact'>
        <div>
          <div className='font-bold text-6xl italic'>
            <h1 className='text-blue-400 pl-20 text-4xl'>Abdulsalam</h1>
            <h1 className='text-slate-600 '>Asheem</h1>

            <h1 className='text-blue-400 pl-20 text-3xl'>Ayomide</h1>
          </div>
          <div className='pl-32 font-medium my-8 italic text-xl text-gray-400'>
            <p className='text-justify'>
              Hello, I'm Asheem. <br /> I'm a Full Stack Software Engineer with
              vast experience in{' '}
              <span className='font-semibold'>
                {' '}
                ReactJs, NextJs, NodeJs, CSS, HTML5, Vanilla JavaScript.
              </span>{' '}
              <br /> This is my final portfolio project signifying the
              completion of ALX Software Engineering 12months Programme.{' '}
            </p>

            <p className='my-10 text-justify'>
              This is an ecommerce web app, designed to ease you the stress of
              going around just to get your vegetables, fruits, and other
              delicacies of your choice. Let's take that burden off you, with us
              your fridges and freezers will never be empty of what you want.
            </p>
          </div>
        </div>
        <div className='my-32'>
          <img src={profile} alt='' width={800} height={1000} />
        </div>
      </section>

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
        <div className=''>
          <a
            href='mailto:abdulsalamasheeem@gmail.com'
            className='flex flex-row items-center gap-3'
          >
            <SiGmail size={25} color={'#BB001B'} />
            <span className='font-medium text-gray-500 underline italic '>
              Gmail
            </span>
          </a>
        </div>
      </div>
    </>
  );
};

export default About;
