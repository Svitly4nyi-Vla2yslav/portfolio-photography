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
  Button
} from './ContactForm.styled';

const ContactForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!fullName || !email) {
      setError('Full Name and Email are required');
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
    } catch (error) {
      setError('Something went wrong. Please try again later.');
      setSuccess(false);
    }
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
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="email"
            placeholder="Email (required)"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
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
