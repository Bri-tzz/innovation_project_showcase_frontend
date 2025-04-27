import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import ProposalForm from '../components/ProposalForm'
import Footer from '../components/Footer'
const CreateEventPage = () => {

  return (
    <div>
      <NavBar />

      <main className='h-screen w-full '>
        <ProposalForm />
      </main>

      <Footer />
    </div>
  )
}

export default CreateEventPage
