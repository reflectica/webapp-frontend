import React from 'react';
import '../styles/Settings.css';
import CardComponent from '../components/Dashboard/CardComponent';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdCard, faShieldHalved, faMoneyBills, faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons';


function Settings() {
    // Sample data
    const cardData = [
        { header: 'Profile & Personal Info', details: 'Provide personal details and how we can reach you', icon: faIdCard,  formId: 'profileForm'  },
        { header: 'Login & Security', details: 'Update your password', icon: faShieldHalved, formId: 'passwordForm'  },
        { header: 'Subscription & Billing', details: 'Review your subscription, billing cycle, and your payment methods', icon: faMoneyBills,  formId: 'paymentForm' },
        // { header: 'Notifications', details: 'Coming Soon', icon: faBullhorn  },
        // { header: 'Privacy & Sharing', details: 'Coming Soon', icon: faEye  },
        // { header: 'App Preferences', details: 'Set your default language, currency, and timezone', icon: faToggleOff  },
        // { header: 'Healthcare Provider Integration', details: 'Share your data with your therapist (not yet available, coming soon!)', icon: faLaptopMedical  },
        // { header: 'Referral Program', details: 'Refer Reflectica to a friend and get 6 full months of free premium', icon: faGift  },
        { header: 'Danger Zone', details: 'Deactivate or delete your account', icon: faTriangleExclamation, formId: 'deleteForm'   },
        // ... add more data as required
    ];

    return (
        <div className="settings-container">
            {cardData.map((data, index) => (
                <CardComponent key={index} data={data} />
            ))}
        </div>
    );
}

export default Settings;
