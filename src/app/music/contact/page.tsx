'use client';

import { modernizFont } from '@/lib/utils';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function MusicContact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [isSubscribing, setIsSubscribing] = useState(false);
    const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // TODO: Replace with actual API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubscribing(true);
        setNewsletterStatus('idle');

        try {
            // TODO: Replace with actual API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setNewsletterStatus('success');
            setNewsletterEmail('');
        } catch (error) {
            setNewsletterStatus('error');
        } finally {
            setIsSubscribing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#030712]">
            <div className="container mx-auto px-4 py-20 pt-62 sm:px-8">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h1 className={`mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl ${modernizFont.className}`}>Get In Touch</h1>
                    <p className="mx-auto max-w-2xl text-lg text-gray-300 md:text-xl">
                        Have a question, want to collaborate, or just want to connect? Send me a message and I'll get back to you as soon as possible.
                    </p>
                </div>

                <div className="mx-auto max-w-2xl space-y-12">
                    {/* Contact Form */}
                    <div>
                        <h2 className={`mb-6 text-center text-2xl font-bold text-white md:text-3xl ${modernizFont.className}`}>Send a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-300">
                                    Name
                                </label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full rounded-xs border-gray-700 bg-gray-900/50 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                                    Email
                                </label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full rounded-xs border-gray-700 bg-gray-900/50 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-300">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={6}
                                    className="flex w-full min-w-0 rounded-xs border border-gray-700 bg-gray-900/50 px-3 py-2 text-base text-white shadow-xs transition-[color,box-shadow] outline-none placeholder:text-gray-500 focus-visible:border-blue-500 focus-visible:ring-[3px] focus-visible:ring-blue-500/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                    placeholder="Your message..."
                                />
                            </div>

                            {submitStatus === 'success' && (
                                <div className="rounded-xs border border-green-700 bg-green-900/30 px-4 py-3 text-green-300">
                                    Thank you! Your message has been sent successfully.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="rounded-xs border border-red-700 bg-red-900/30 px-4 py-3 text-red-300">
                                    Something went wrong. Please try again later.
                                </div>
                            )}

                            <div className="flex justify-center">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="group inline-flex items-center justify-center rounded bg-blue-900 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-800/20 transition-all duration-300 hover:scale-105 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Newsletter Signup */}
                    <div>
                        <h2 className={`mb-6 text-center text-2xl font-bold text-white md:text-3xl ${modernizFont.className}`}>Newsletter</h2>
                        <p className="mb-6 text-center text-base leading-relaxed text-gray-300 md:text-lg">
                            Stay updated with my latest music releases, upcoming events, and ministry updates. Subscribe to my newsletter to never
                            miss a beat.
                        </p>

                        <form onSubmit={handleNewsletterSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="newsletter-email" className="mb-2 block text-sm font-medium text-gray-300">
                                    Email Address
                                </label>
                                <Input
                                    type="email"
                                    id="newsletter-email"
                                    name="newsletter-email"
                                    value={newsletterEmail}
                                    onChange={(e) => setNewsletterEmail(e.target.value)}
                                    required
                                    className="w-full rounded-xs border-gray-700 bg-gray-900/50 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            {newsletterStatus === 'success' && (
                                <div className="rounded-xs border border-green-700 bg-green-900/30 px-4 py-3 text-green-300">
                                    Thank you for subscribing! Check your email to confirm your subscription.
                                </div>
                            )}

                            {newsletterStatus === 'error' && (
                                <div className="rounded-xs border border-red-700 bg-red-900/30 px-4 py-3 text-red-300">
                                    Something went wrong. Please try again later.
                                </div>
                            )}

                            <div className="flex justify-center">
                                <Button
                                    type="submit"
                                    disabled={isSubscribing}
                                    className="group inline-flex items-center justify-center rounded bg-blue-900 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-800/20 transition-all duration-300 hover:scale-105 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                                </Button>
                            </div>
                        </form>

                        {/* Additional Info */}
                        <div className="mt-8 rounded-xs border border-gray-700 bg-gray-900/30 p-6">
                            <h3 className="mb-3 text-lg font-semibold text-white">What to Expect</h3>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li className="flex items-start">
                                    <span className="mr-2 text-blue-500">•</span>
                                    <span>Latest music releases and updates</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 text-blue-500">•</span>
                                    <span>Upcoming events and concert dates</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 text-blue-500">•</span>
                                    <span>Ministry updates and reflections</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 text-blue-500">•</span>
                                    <span>Exclusive content and behind-the-scenes</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
