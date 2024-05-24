import React from 'react';
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar5 from "assets/img/avatars/avatar5.png";

const ActivityItem = ({ user, date, time, title, description, images, mapUrl, blog }) => (
    <li className="relative mb-2 p-2 hover:bg-gray-100">
        <div className="absolute top-3 left-2 w-8 h-8">
            <a href={user.profileUrl} title={user.name} className="tooltip" data-bs-toggle="tooltip">
                <img alt={user.name} src={user.avatar} className="w-8 h-8 rounded-full" />
            </a>
        </div>
        <div className="relative ml-10 bg-white p-4 rounded-xl shadow">
            <div className="flex items-start justify-between">
                <div className="mr-5">
                    <h4 className="text-sm font-semibold text-gray-800">{date}</h4>
                    <span className="text-xs text-gray-500">{time}</span>
                </div>
            </div>
            <div className="mt-2 bg-gray-100 p-4 rounded-xl shadow-inner">
                <h3 className="text-lg font-semibold text-indigo-700">
                    {title} <span className="text-gray-700">{description}</span>
                </h3>
                <p className="text-sm text-gray-500 mt-1">{description}</p>
                {images && (
                    <ul className="flex mt-2 space-x-2">
                        {images.map((img, index) => (
                            <li key={index}>
                                <img className="w-16 h-16 object-cover rounded" src={img} alt="" />
                            </li>
                        ))}
                    </ul>
                )}
                {mapUrl && (
                    <div className="mt-2 border-2 border-white rounded">
                        <iframe
                            src={mapUrl}
                            className="w-full h-64 rounded"
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                )}
                {blog && (
                    <ul className="mt-2">
                        <li className="flex space-x-4">
                            <div className="w-16">
                                <a href="javascript:;">
                                    <img className="w-full h-16 object-cover rounded" src={blog.image} alt="" />
                                </a>
                            </div>
                            <div className="flex-grow">
                                <div className="flex items-center text-xs text-gray-500">
                                    <h5 className="font-semibold">{blog.category}</h5>
                                    <span className="ml-2">{blog.date}</span>
                                </div>
                                <h4 className="text-sm font-semibold">
                                    <a href="javascript:;">{blog.title}</a>
                                </h4>
                                <p className="text-xs text-gray-500">Read more in {blog.readTime} Minutes<i className="fa fa-long-arrow-right ml-2"></i></p>
                            </div>
                        </li>
                    </ul>
                )}
            </div>
            <div className="absolute top-0 right-0 bg-red-100 text-red-600 border border-red-600 w-5 h-5 rounded-full text-center text-lg leading-5 cursor-pointer hover:bg-red-600 hover:text-white hidden group-hover:block">
                x
            </div>
        </div>
    </li>
);

const RecentActivities = () => {
    const activities = [
        {
            user: {
                name: 'Lesley Grauer',
                // profileUrl: 'profile.html',
                avatar: avatar2
            },
            date: 'Today',
            time: '4.50 PM',
            title: 'Bernardo James',
            description: 'Uploaded 3 new photos for World Safety Event',
        },
        {
            user: {
                name: 'Catherine Manseau',
                // profileUrl: 'profile.html',
                avatar: avatar3
            },
            date: 'Yesterday',
            time: '3.20 PM',
            title: 'Dr. Linda Carpenter',
            description: 'Doctors Meeting',
        },
        {
            user: {
                name: 'Bernardo Galaviz',
                // profileUrl: '#',
                avatar: avatar1
            },
            date: '05 Sep 2022',
            time: '1.20 PM',
            title: 'Dr.Markhay smith',
            description: 'was Completed the Operation With in Deadline',
        },
        {
            user: {
                name: 'Mike Litorus',
                // profileUrl: 'profile.html',
                avatar: avatar5
            },
            date: '20 Oct 2022',
            time: '2.20 PM',
            title: 'Rio Williams',
            description: 'Posted a Blog about Corona Safety Measurements',
        }
    ];

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white rounded-lg shadow-md">
                <div className="p-6">
                    <div className="relative">
                        <ul className="list-none m-0 p-0 relative">
                            {activities.map((activity, index) => (
                                <ActivityItem key={index} {...activity} />
                            ))}
                        </ul>
                        <div className="absolute top-2 left-6 w-0.5 bg-indigo-100 h-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentActivities;
