import React from 'react';

const Gallery = () => {
  const eventPhotos = [
    {
      id: 1,
      title: "Community Tree Planting",
      eventType: "Plantation",
      imageUrl: "https://media.istockphoto.com/id/936915334/photo/nice-young-woman-holding-a-tree.jpg?s=612x612&w=0&k=20&c=nabR8e0lkWC6g6MQPuCErgx6x2ud4h_WhOzIR3ScYhk=",
      caption: "Volunteers planting trees to restore local greenery.",
    },
    {
      id: 2,
      title: "Beach Cleanup Drive",
      eventType: "Cleanup",
      imageUrl: "https://www.neefusa.org/sites/default/files/field/image/WEB19-WeatherClimate-BeachCleanUp-5759x3240.jpg",
      caption: "Cleaning up the coast to protect marine life.",
    },
    {
      id: 3,
      title: "Charity Donation Event",
      eventType: "Donation",
      imageUrl: "https://www.socialtables.com/wp-content/uploads/2016/10/iStock-540095978.jpg",
      caption: "Collecting supplies for local communities in need.",
    },
    {
      id: 4,
      title: "Urban Garden Workshop",
      eventType: "Other",
      imageUrl: "https://www.urbangardenworkshop.com/wp-content/uploads/2013/10/Raised-Bed-Redwood-Boxes-e1525228473496.jpg",
      caption: "Learning sustainable gardening in the city.",
    },
  ];

  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
          Event Gallery
        </h1>
        <p className="text-center text-sm sm:text-base md:text-lg text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto">
          Explore highlights from our community events, from tree planting to cleanups and more.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {eventPhotos.map((photo) => (
            <div
              key={photo.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-48 sm:h-64 object-cover"
                onError={(e) => (e.target.src = 'https://placehold.co/600x400?text=Image+Not+Found')}
              />
              <div className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  {photo.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-500 mb-2">
                  Type: {photo.eventType}
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;