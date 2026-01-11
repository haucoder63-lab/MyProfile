"use client";

import { MDBFooter } from "mdb-react-ui-kit";
import Link from "next/link";

export default function Footer() {
    const date = new Date();
    return(
    <MDBFooter bgColor='light' className='text-center text-lg-left'>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {date.getFullYear()} Copyright:{' '}
        <Link 
        style={{
            textDecoration: 'none'
        }}
        className='text-dark' href='https://mdbootstrap.com/'>
          Lê Hậu
        </Link>
      </div>
    </MDBFooter>
    );
}