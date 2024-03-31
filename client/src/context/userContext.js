import { createContext, useEffect, useState } from "react";  // Importing necessary functions and modules from React

export const UserContext = createContext();  // इस लाइन से createContext फ़ंक्शन का उपयोग करके UserContext बनाया जा raha है, jisse useful डेटा को कंपोनेंट के बीच mai connect करने के लिए use kiya gaya hai

const UserProvider = ({children}) => {  // UserProvider नामक एक फ़ंक्शनल कंपोनेंट डिफ़ाइन किया gaya है जो children को props के रूप में लेता है। children props यहां इस प्रोवाइडर द्वारा wrap kiye जाने वाले नेस्टेड कंपोनेंट्स को प्रतिनिधित करता है।

  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')))  // currentUser नामक स्थिति बनाई जाती है जिसमें लोकल स्टोरेज से प्राप्त किए गए उपयोगकर्ता डेटा के साथ शुरू होती है।
  // setCurrentUser एक फ़ंक्शन है जिससे currentUser स्थिति को अपडेट किया जा सकता है।

  useEffect(() => {    // useEffect हुक का उपयोग करके currentUser स्थिति में कोई बदलाव होने पर लोकल स्टोरेज को अपडेट करने के लिए।
                       // डिपेंडेंसी एरे [currentUser] यह सुनिश्चित करता है कि इफेक्ट केवल जब currentUser बदलता है तब ही चलता है।
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser])

  // Providing the UserContext to the component tree with the current user and the function to set the current user
  return <UserContext.Provider value={{currentUser, setCurrentUser}}>{children}</UserContext.Provider>
}


export default UserProvider;