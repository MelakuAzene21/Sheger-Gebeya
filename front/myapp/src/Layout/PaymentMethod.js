// import React from 'react';

// // Sample logos (replace with actual paths or URLs)
// import BankA from './public/images/bankA-logo.png';
// import BankB from './public/images/bankB-logo.png';
// import BankC from './public/images/bankC-logo.png';
// import TelebirrLogo from './public/images/telebirr-logo.png';

// const PaymentMethods = () => {
//     const paymentOptions = [
//         { name: 'Bank A', logo: BankA },
//         { name: 'Bank B', logo: BankB },
//         { name: 'Bank C', logo: BankC },
//         { name: 'Telebirr', logo: TelebirrLogo },
//     ];

//     return (
//         <div className="bg-gray-50 py-12">
//             <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Payment Methods</h2>
//                 <p className="text-center text-gray-600 mb-8">
//                     We offer a variety of payment options to make your transactions convenient and secure. Choose from any of the trusted banks and payment services below.
//                 </p>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//                     {paymentOptions.map((option, index) => (
//                         <div key={index} className="flex flex-col items-center space-y-4">
//                             <img src={option.logo} alt={option.name} className="h-16 w-16 object-contain" />
//                             <span className="text-lg font-semibold text-gray-700">{option.name}</span>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PaymentMethods;





import React from 'react';

const PaymentMethods = () => {
    // Replace these URLs with the actual URLs of the images you'd like to use
    const paymentOptions = [
        { name: 'Bank A', logo: 'https://example.com/path/to/bankA-logo.png' },
        { name: 'Bank B', logo: 'https://example.com/path/to/bankB-logo.png' },
        { name: 'Bank C', logo: 'https://example.com/path/to/bankC-logo.png' },
        { name: 'Telebirr', logo: 'https://example.com/path/to/telebirr-logo.png' },
    ];

    return (
        <div className="bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Payment Methods</h2>
                <p className="text-center text-gray-600 mb-8">
                    We offer a variety of payment options to make your transactions convenient and secure. Choose from any of the trusted banks and payment services below.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {paymentOptions.map((option, index) => (
                        <div key={index} className="flex flex-col items-center space-y-4">
                            <img src={option.logo} alt={option.name} className="h-16 w-16 object-contain" />
                            <span className="text-lg font-semibold text-gray-700">{option.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PaymentMethods;
