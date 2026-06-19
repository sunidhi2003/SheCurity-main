'use client';

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/emergcontact.css';

export default function EmergencyContacts() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const emergencyContacts = [
    { name: t['emergencyContacts.national1.name'], number: '112', description: t['emergencyContacts.national1.desc'] },
    { name: t['emergencyContacts.national2.name'], number: '181', description: t['emergencyContacts.national2.desc'] },
    { name: t['emergencyContacts.national3.name'], number: '100', description: t['emergencyContacts.national3.desc'] },
    { name: t['emergencyContacts.national4.name'], number: '1098', description: t['emergencyContacts.national4.desc'] },
    { name: t['emergencyContacts.national5.name'], number: '181', description: t['emergencyContacts.national5.desc'] },
    { name: t['emergencyContacts.national6.name'], number: '155260', description: t['emergencyContacts.national6.desc'] },
  ];

  const stateContacts = [
    { state: 'Andhra Pradesh', contacts: [{ name: t['emergencyContacts.state.womenHelpline'], number: '181' }, { name: t['emergencyContacts.state.police'], number: '100' }, { name: t['emergencyContacts.state.ambulance'], number: '108' }] },
    { state: 'Arunachal Pradesh', contacts: [{ name: t['emergencyContacts.state.womenHelpline'], number: '181' }, { name: t['emergencyContacts.state.police'], number: '100' }, { name: t['emergencyContacts.state.ambulance'], number: '108' }] },
    { state: 'Assam', contacts: [{ name: t['emergencyContacts.state.womenHelpline'], number: '181' }, { name: t['emergencyContacts.state.police'], number: '100' }, { name: t['emergencyContacts.state.ambulance'], number: '108' }] },
    { state: 'Bihar', contacts: [{ name: t['emergencyContacts.state.womenHelpline'], number: '181' }, { name: t['emergencyContacts.state.police'], number: '100' }, { name: t['emergencyContacts.state.ambulance'], number: '108' }] },
    { state: 'Chhattisgarh', contacts: [{ name: t['emergencyContacts.state.womenHelpline'], number: '181' }, { name: t['emergencyContacts.state.police'], number: '100' }, { name: t['emergencyContacts.state.ambulance'], number: '108' }] },
    { state: 'Goa', contacts: [{ name: t['emergencyContacts.state.womenHelpline'], number: '181' }, { name: t['emergencyContacts.state.police'], number: '100' }, { name: t['emergencyContacts.state.ambulance'], number: '108' }] },
    { state: 'Gujarat', contacts: [{ name: t['emergencyContacts.state.womenHelpline'], number: '181' }, { name: t['emergencyContacts.state.police'], number: '100' }, { name: t['emergencyContacts.state.ambulance'], number: '108' }] },
    { state: 'Haryana', contacts: [{ name: t['emergencyContacts.state.womenHelpline'], number: '181' }, { name: t['emergencyContacts.state.police'], number: '100' }, { name: t['emergencyContacts.state.ambulance'], number: '108' }] },
    { state: 'Himachal Pradesh', contacts: [{ name: t['emergencyContacts.state.womenHelpline'], number: '181' }, { name: t['emergencyContacts.state.police'], number: '100' }, { name: t['emergencyContacts.state.ambulance'], number: '108' }] },
    { state: 'Jharkhand', contacts: [{ name: t['emergencyContacts.state.womenHelpline'], number: '181' }, { name: t['emergencyContacts.state.police'], number: '100' }, { name: t['emergencyContacts.state.ambulance'], number: '108' }] },
    { state: 'Karnataka', contacts: [{ name: t['emergencyContacts.state.womenHelpline'], number: '181' }, { name: t['emergencyContacts.state.police'], number: '100' }, { name: t['emergencyContacts.state.ambulance'], number: '108' }] },
    { state: 'Kerala', contacts: [{ name: t['emergencyContacts.state.womenHelpline'], number: '181' }, { name: t['emergencyContacts.state.police'], number: '100' }, { name: t['emergencyContacts.state.ambulance'], number: '108' }] },
    { state: 'Madhya Pradesh', contacts: [{ name: t['emergencyContacts.state.womenHelpline'], number: '181' }, { name: t['emergencyContacts.state.police'], number: '100' }, { name: t['emergencyContacts.state.ambulance'], number: '108' }] },
    { state: 'Maharashtra', contacts: [{ name: t['emergencyContacts.state.womenHelpline'], number: '103' }, { name: t['emergencyContacts.state.police'], number: '100' }, { name: t['emergencyContacts.state.ambulance'], number: '108' }] },
    { state: 'Delhi (NCT)', contacts: [{ name: t['emergencyContacts.state.womenHelpline'], number: '181' }, { name: t['emergencyContacts.state.police'], number: '100' }, { name: t['emergencyContacts.state.ambulance'], number: '108' }] },
    { state: 'Tamil Nadu', contacts: [{ name: t['emergencyContacts.state.womenHelpline'], number: '181' }, { name: t['emergencyContacts.state.police'], number: '100' }, { name: t['emergencyContacts.state.ambulance'], number: '108' }] },
    { state: 'Telangana', contacts: [{ name: t['emergencyContacts.state.womenHelpline'], number: '181' }, { name: t['emergencyContacts.state.police'], number: '100' }, { name: t['emergencyContacts.state.ambulance'], number: '108' }] },
    { state: 'Uttar Pradesh', contacts: [{ name: t['emergencyContacts.state.womenHelpline'], number: '181' }, { name: t['emergencyContacts.state.police'], number: '100' }, { name: t['emergencyContacts.state.ambulance'], number: '108' }] },
    { state: 'West Bengal', contacts: [{ name: t['emergencyContacts.state.womenHelpline'], number: '181' }, { name: t['emergencyContacts.state.police'], number: '100' }, { name: t['emergencyContacts.state.ambulance'], number: '108' }] },
    { state: 'Rajasthan', contacts: [{ name: t['emergencyContacts.state.womenHelpline'], number: '181' }, { name: t['emergencyContacts.state.police'], number: '100' }, { name: t['emergencyContacts.state.ambulance'], number: '108' }] },
    { state: 'Punjab', contacts: [{ name: t['emergencyContacts.state.womenHelpline'], number: '181' }, { name: t['emergencyContacts.state.police'], number: '100' }, { name: t['emergencyContacts.state.ambulance'], number: '108' }] },
    { state: 'Odisha', contacts: [{ name: t['emergencyContacts.state.womenHelpline'], number: '181' }, { name: t['emergencyContacts.state.police'], number: '100' }, { name: t['emergencyContacts.state.ambulance'], number: '108' }] },
  ];

  const filteredStates = stateContacts.filter(s =>
    s.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="emergency-page">
      <div className="emergency-container">
        {/* Header */}
        <div className="emergency-header">
          <div className="section-badge">🆘 Emergency Helplines</div>
          <h1 className="section-title">{t['emergencyContacts.title']}</h1>
          <p className="section-subtitle">{t['emergencyContacts.subtitle']}</p>
        </div>

        {/* National Numbers */}
        <h2 className="section-title" style={{ fontSize: '22px', marginBottom: '24px' }}>
          {t['emergencyContacts.national']}
        </h2>
        <div className="emergency-national-grid">
          {emergencyContacts.map((contact) => (
            <div key={contact.name} className="emergency-national-card">
              <div className="emergency-national-card__name">{contact.name}</div>
              <a href={`tel:${contact.number}`} className="emergency-national-card__number">
                {contact.number}
              </a>
              <p className="emergency-national-card__desc">{contact.description}</p>
            </div>
          ))}
        </div>

        {/* State-wise */}
        <h2 className="section-title" style={{ fontSize: '22px', marginBottom: '24px' }}>
          {t['emergencyContacts.stateWise']}
        </h2>

        {/* Search */}
        <div className="emergency-search-wrap">
          <span className="emergency-search-icon">🔍</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t['emergencyContacts.searchPlaceholder']}
            className="emergency-search"
          />
          {searchTerm && (
            <button className="emergency-search-clear" onClick={() => setSearchTerm('')}>✕</button>
          )}
        </div>

        <div className="emergency-state-grid">
          {filteredStates.map((state) => (
            <div key={state.state} className="emergency-state-card">
              <div className="emergency-state-card__name">{state.state}</div>
              {state.contacts.map((contact) => (
                <div key={contact.name} className="emergency-state-contact">
                  <span className="emergency-state-contact__label">{contact.name}</span>
                  <a href={`tel:${contact.number}`} className="emergency-state-contact__number">
                    {contact.number}
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>

        {searchTerm && filteredStates.length === 0 && (
          <div className="emergency-no-results">
            No results found for "{searchTerm}"
          </div>
        )}

        {/* CTA */}
        <div className="emergency-cta">
          <a href="tel:112" className="emergency-button">
            🚨 {t['emergency.call']}
          </a>
        </div>
      </div>
    </div>
  );
}
