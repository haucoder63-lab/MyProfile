"use client";

import Link from "next/link";

export default function Footer() {
    const date = new Date();
    return(
    <footer className='bg-gray-100 text-center text-lg-left'>
      <div className='text-center p-3 bg-black bg-opacity-20'>
        &copy; {date.getFullYear()} Copyright:{' '}
        <Link 
        style={{
            textDecoration: 'none'
        }}
        className='text-gray-800 hover:text-gray-600' href='https://mdbootstrap.com/'>
          Lê Hậu
        </Link>
      </div>
    </footer>
    );
}