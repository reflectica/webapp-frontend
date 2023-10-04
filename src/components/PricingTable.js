import React, { useEffect, useRef } from 'react';

const PricingTable = () => {
  const stripeRef = useRef(null);

  useEffect(() => {
    // Create a new script element
    const script = document.createElement('script');
    
    // Add type and src to the script element
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://js.stripe.com/v3/pricing-table.js';
    
    // Add the script to the DOM
    document.head.appendChild(script);

    // Add custom stripe-pricing-table after the script has loaded
    script.onload = () => {
      if (stripeRef.current) {
        stripeRef.current.innerHTML = `
          <stripe-pricing-table pricing-table-id="prctbl_1Nu5FwCh1Mt6BH7VxSrOjbPF"
            publishable-key="pk_live_51NsEzHCh1Mt6BH7VeZzK2j81iEgFglXuJODYhImc2CR0r6iilFNH8kS1Ic4qaGmp0F16eYq0qedTtPHjA1CkGu0j00K9OGp47N">
          </stripe-pricing-table>
        `;
      }
    };

    // Remove script from DOM to avoid duplicates
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div ref={stripeRef}></div>
  );
};

export default PricingTable;
