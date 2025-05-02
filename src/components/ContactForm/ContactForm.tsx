// src/components/ContactForm.tsx
import { useState } from 'react';

import { supabase } from '../../supabaseClient';

import {
  FormContainer,
  Success,
  FormGroup,
  Input,
  Textarea,
  Error,
  Button,
} from './ContactForm.styled';

const ContactForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
  });

  const handleBlur = (field: 'fullName' | 'email') => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setTouched({ fullName: true, email: true });
  
    if (!fullName || !email) {
      setError('Full Name and Email are required');
      return;
    }
  
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    try {
      const { error } = await supabase.from('contact_messages').insert([
        {
          full_name: fullName,
          email: email,
          subject: subject,
          message: message,
          created_at: new Date(),
        },
      ]);

      if (error) throw error;

      setSuccess(true);
      setFullName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setError(null);
      setTouched({ fullName: false, email: false });
    } catch (error) {
      setError('Something went wrong. Please try again later.');
      setSuccess(false);
    }
  };
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <FormContainer>
      {success && <Success>Your message has been sent successfully!</Success>}
      {error && <Error>{error}</Error>}
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="text"
            placeholder="Full Name (required)"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            onBlur={() => handleBlur('fullName')}
            hasError={touched.fullName && !fullName}
          />
          {touched.fullName && !fullName && (
            <Error>Full Name is required</Error>
          )}
        </FormGroup>
        <FormGroup>
          <Input
           
            placeholder="Email (required)"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onBlur={() => handleBlur('email')}
            hasError={
              !!(
                (touched.email && !email) ||
                (touched.email && email && !validateEmail(email))
              )
            }
          />
          {touched.email && !email && <Error>Email is required</Error>}
          {touched.email && email && !validateEmail(email) && (
            <Error>Please enter a valid email address</Error>
          )}
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={e => setSubject(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Textarea
            placeholder="Message"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </FormGroup>
        <Button type="submit">Send a Message</Button>
      </form>
    </FormContainer>
  );
};

export default ContactForm;
