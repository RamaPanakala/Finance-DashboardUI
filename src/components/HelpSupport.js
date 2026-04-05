import React, { useState } from 'react';
import '../styles/HelpSupport.css';

/**
 * Help & Support Component
 * 
 * Provides FAQs and contact form for user support
 * Features:
 * - Expandable FAQ section
 * - Contact form submission
 * - Form validation
 * - Dark mode support
 * - Responsive design
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onClose - Callback to close the modal
 * @returns {JSX.Element} The help and support modal
 */
const HelpSupport = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('faq');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    description: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  // FAQ data
  const faqs = [
    {
      id: 1,
      question: 'How do I add a new transaction?',
      answer: 'Navigate to the Transactions section and click the "+ Add Transaction" button. Fill in the date, amount, category, and type (income/expense), then click submit.'
    },
    {
      id: 2,
      question: 'Can I export my transactions to PDF?',
      answer: 'Yes! In the Transactions section, click the "📄 Export PDF" button to generate a professional PDF report of your transactions with currency formatting.'
    },
    {
      id: 3,
      question: 'How does currency conversion work?',
      answer: 'Go to Settings > Currency to select your preferred display currency. All amounts are automatically converted using real exchange rates.'
    },
    {
      id: 4,
      question: 'What does the expense ratio mean?',
      answer: 'The expense ratio shows what percentage of your income you spent. Below 50% is great, 50-75% is caution, above 75% means you\'re spending more than earning.'
    },
    {
      id: 5,
      question: 'How can I view my spending by category?',
      answer: 'The Dashboard has a "Spending Breakdown" chart, and the Insights section has detailed breakdowns with a bar chart showing category-wise spending.'
    },
    {
      id: 6,
      question: 'Can I filter transactions by date range?',
      answer: 'Yes! The Dashboard has filters for Balance Trend and Spending Breakdown (3/6/12 months). The Insights section also has dynamic filtering options.'
    },
    {
      id: 7,
      question: 'Is there a dark mode?',
      answer: 'Yes! Click the moon/sun icon (🌙/☀️) in the header to toggle between light and dark modes. Your preference is automatically saved.'
    },
    {
      id: 8,
      question: 'How do I change my role between Admin and Viewer?',
      answer: 'Click the role selector in the header to switch between Admin and Viewer roles. Admin can add/edit/delete transactions, while Viewer can only view.'
    },
    {
      id: 9,
      question: 'What is the pagination in Transactions?',
      answer: 'Transactions are displayed 5 per page. Use the page numbers at the bottom to navigate through all your transactions. The display shows which transaction you\'re viewing (e.g., 1-5 of 500).'
    },
    {
      id: 10,
      question: 'How often are exchange rates updated?',
      answer: 'Exchange rates are updated when you refresh the page or restart the application. They\'re stored locally and used for all currency conversions.'
    },
  ];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.description) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all required fields' });
      return;
    }

    // Simulate form submission
    console.log('Support form submitted:', formData);
    setSubmitStatus({ type: 'success', message: 'Thank you! We\'ll get back to you within 24 hours.' });
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', description: '' });
      setSubmitStatus(null);
    }, 2000);
  };

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="help-support-overlay">
      <div className="help-support-modal">
        {/* Header */}
        <div className="help-support-header">
          <h2>❓ Help & Support</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div className="help-support-tabs">
          <button
            className={`tab-btn ${activeTab === 'faq' ? 'active' : ''}`}
            onClick={() => setActiveTab('faq')}
          >
            📚 FAQs
          </button>
          <button
            className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            📧 Contact Us
          </button>
        </div>

        {/* Content */}
        <div className="help-support-content">
          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="faq-section">
              <div className="faq-header">
                <h3>Frequently Asked Questions</h3>
                <p>Find answers to common questions about Finance Dashboard</p>
              </div>
              <div className="faq-list">
                {faqs.map(faq => (
                  <div key={faq.id} className="faq-item">
                    <button
                      className="faq-question"
                      onClick={() => toggleFaq(faq.id)}
                    >
                      <span className="faq-icon">{expandedFaq === faq.id ? '▼' : '▶'}</span>
                      {faq.question}
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="faq-answer">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Form Tab */}
          {activeTab === 'contact' && (
            <div className="contact-section">
              <div className="contact-header">
                <h3>Get in Touch</h3>
                <p>Have a question or issue? Fill out the form below and we'll get back to you shortly.</p>
              </div>

              {submitStatus && (
                <div className={`submit-status ${submitStatus.type}`}>
                  {submitStatus.message}
                </div>
              )}

              <form className="contact-form" onSubmit={handleFormSubmit}>
                {/* Name Field */}
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Your name"
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                {/* Phone Field */}
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* Subject Field */}
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleFormChange}
                  >
                    <option value="">Select a subject...</option>
                    <option value="general">General Inquiry</option>
                    <option value="bug">Report a Bug</option>
                    <option value="feature">Feature Request</option>
                    <option value="payment">Payment Issue</option>
                    <option value="account">Account Issue</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Description Field */}
                <div className="form-group">
                  <label htmlFor="description">Description *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    placeholder="Please describe your issue or question in detail..."
                    rows="6"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="help-support-footer">
          <p>📧 Email: support@financedashboard.com</p>
          <p>🕐 Response time: 24 hours</p>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
