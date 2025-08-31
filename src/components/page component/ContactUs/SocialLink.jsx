import React from 'react';
import { FiLink, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

const SocialLink = () => {
    const resources = [
        { name: 'User Resources', link: '#' },
        { name: 'User Resources', link: '#' },
        { name: 'User Resources', link: '#' }
    ];

    const socialLinks = [
        { icon: <FiFacebook size={20} />, link: '#', name: 'Facebook' },
        { icon: <FiTwitter size={20} />, link: '#', name: 'Twitter' },
        { icon: <FiInstagram size={20} />, link: '#', name: 'Instagram' },
        { icon: <FiLinkedin size={20} />, link: '#', name: 'LinkedIn' }
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-wrap justify-center gap-4">
                {resources.map((resource, index) => (
                    <a
                        key={index}
                        href={resource.link}
                        className="bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-blue-600 font-medium flex items-center"
                    >
                        <FiLink className="mr-2" />
                        {resource.name}
                    </a>
                ))}
            </div>

            <div className="text-center">
                <h4 className="text-lg font-medium text-gray-800 mb-4">Follow Us</h4>
                <div className="flex justify-center space-x-4">
                    {socialLinks.map((social, index) => (
                        <a
                            key={index}
                            href={social.link}
                            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors duration-300"
                            aria-label={social.name}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SocialLink;