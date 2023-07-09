import React from 'react'
import Layout from '../../components/layout/Layout'

const LeadSubmission = () => {
  return (
    <Layout>
        <div className='lead-form mt-5'>
            <form>
                <input type='text' placeholder='First Name'/>
            </form>
        </div>
    </Layout>
  )
}

export default LeadSubmission