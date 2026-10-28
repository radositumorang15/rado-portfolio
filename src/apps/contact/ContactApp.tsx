'use client';

import React, { useState } from 'react';
import { ContactView } from './ContactView';
import { notch } from '../../os/notch';

export const ContactApp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      // Post to Formspree endpoint or fallback
      const res = await fetch('https://formspree.io/f/mqaejvyw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus({ type: 'success', text: 'Message delivered successfully! Rado will reply soon.' });
        setName('');
        setEmail('');
        setMessage('');
        notch.show({
          title: 'Message Sent',
          subtitle: 'Thanks for reaching out!',
          icon: 'check',
        });
      } else {
        throw new Error('Service responded with error');
      }
    } catch {
      setStatus({
        type: 'error',
        text: 'Direct submission failed. Opening your default mail client...',
      });
      window.location.href = `mailto:radositumorang15@gmail.com?subject=Contact from Portfolio - ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactView
      name={name}
      email={email}
      message={message}
      isSubmitting={isSubmitting}
      statusMessage={status}
      onNameChange={setName}
      onEmailChange={setEmail}
      onMessageChange={setMessage}
      onSubmit={handleSubmit}
    />
  );
};
