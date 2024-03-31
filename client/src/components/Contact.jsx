import React from 'react';

function ContactDetails() {

  const contacts = [
    {
      name: 'Arpita Suicide Prevention Helpline',
      email: 'arpita.helpline@gmail.com',
      phone: '080-23655557',
      time: '10:00 AM - 01:00 PM | 02:00 PM - 05:00 PM | Monday to Friday',
      site: 'N/A',
    },
    {
      name: 'Vandrevala Foundation',
      email: 'help@vandrevalafoundation.com',
      phone: ' 9999 666 555',
      time: '24x7 | All days of the week',
      site: 'https://www.vandrevalafoundation.com/',
    },
    {
      name: 'Parivarthan',
      email: 'N/A',
      phone: '+91-7676602602',
      time: '1:00 PM - 10:00 PM | Monday to Friday',
      site: 'https://parivarthan.org/',
    },
    {
      name: 'Sangath',
      email: 'contactus@sangath.in',
      phone: '011-41198666',
      time: '10 AM -6 PM',
      site: 'https://sangath.in/',
    },
    {
      name: 'Connecting Trust',
      email: 'distressmailsconnecting@gmail.com',
      phone: '+91-9922001122, +91-9922004305',
      time: '2:00 PM - 08:00 PM | All days of the week',
      site: 'https://connectingngo.org',
    },
    {
      name: 'Muktaa Helpline',
      email: 'contactus@mcf.org.in',
      phone: '788-788-9882 , 080-69267931',
      time: '12-8 PM | Monday-Saturday',
      site: 'https://mentalhelpline.mcf.org.in/',
    },
  ];


  return (
    <div className="containersss">
      <h1>Helpline numbers for Stress, Anxiety, Depression</h1>
      <div className="contact-details">
        {contacts.map((contact, index) => (
          <div key={index} className="contact-details-item">
            <h2>Contact {index + 1}</h2>
            <div className="contact-info">
              <label>Name:</label>
              <p>{contact.name}</p>
              <label>Email:</label>
              <p>{contact.email}</p>
              <label>Phone:</label>
              <p>{contact.phone}</p>
              <label>Timing:</label>
              <p>{contact.time}</p>
              <label>Website:</label>
              <p>{contact.site}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactDetails;
