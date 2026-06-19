import Button from "../Button/Button";
import styles from "./Contact.module.css";
import { MdMessage } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { useState } from "react";
import contactImage from "../../assets/images/Contact.jpg";
import { send } from '@emailjs/browser';
const ContactForm = () => {
  const [name, setName] = useState("Anshu");
  const [email, setEmail] = useState("support@dosomecoding.com");
  const [text, setText] = useState("Subscribe to this channel");

  const onSubmit = (event) => {
    event.preventDefault();
  
    const formData = {
      from_name: event.target.name.value,  // This corresponds to {{from_name}} in the template
      to_name: 'Yashswi.dev',          // Set the recipient name or email
      message: event.target.text.value,
    };
  
    send(
      'service_lw3c74n', // Replace with your Service ID
      'template_3bpm9dj', // Replace with your Template ID
      formData,
      'AZOALSVe3kWyg0sds' // Replace with your Public Key
    )
      .then((response) => {
        alert('Message sent successfully!');
        console.log('SUCCESS!', response.status, response.text);
      })
      .catch((err) => {
        alert('Failed to send message, please try again.');
        console.error('FAILED...', err);
      });
  };
  

  return (
    <section className={styles.container}>
      <div className={styles.contact_form}>
        <div className={styles.top_btn}>
          <Button
            text="VIA SUPPORT CHAT"
            icon={<MdMessage fontSize="24px" />}
          />
          <Button text="VIA CALL" icon={<FaPhoneAlt fontSize="24px" />} />
        </div>
        <Button
          isOutline={true}
          text="VIA EMAIL FORM"
          icon={<HiMail fontSize="24px" />}
        />

        <form onSubmit={onSubmit}>
          <div className={styles.form_control}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" />
          </div>
          <div className={styles.form_control}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" />
          </div>
          <div className={styles.form_control}>
            <label htmlFor="text">Text</label>
            <textarea name="text" rows="8" />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button text="SUBMIT BUTTON" />
          </div>

          <div>{name + " " + email + " " + text}</div>
        </form>
      </div>
      <div className={styles.contact_image}>
        <img src={contactImage} alt="contact image" />
      </div>
    </section>
  );
};

export default ContactForm;