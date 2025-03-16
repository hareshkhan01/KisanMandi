// Blogs.tsx
import BlogCard from "./cards/blogCard";

export default function Blogs() {
  const blogPosts = [
    {
      title: "Sustainable Farming Techniques",
      description:
        "Discover innovative methods for eco-friendly agriculture that boost yield while preserving natural resources.",
      date: "2024-03-15",
      image:
        "https://blogmedia.testbook.com/blog/wp-content/uploads/2023/08/agriculture-schemes-in-india-69844e95.jpg",
      link: "https://testbook.com/ias-preparation/agriculture-schemes-in-india",
    },
    {
      title: "Modern Irrigation Solutions",
      description:
        "Learn about water-efficient irrigation systems that are transforming crop management.",
      date: "2024-03-14",
      link: "https://tractorguru.in/tractor-blog/government-schemes-to-promote-agriculture-in-india",
      image:
        "https://tractorguru.in/upload/tractor/Blogs/For%20Website%20Blogs/GOVERNMENT%20SCHEMES%20W.webp",
    },
    {
      title: "Organic Fertilizers 101",
      description:
        "A comprehensive guide to natural fertilizers for healthier crops and soil regeneration.",
      date: "2024-03-13",
      link: "https://www.google.com/search?sca_esv=a0f6929b78caa0c6&sxsrf=AHTn8zpmVRRWurElIz2Ue2IAH-yHY4L6OQ:1742135863159&q=agriculture+based+government+schemes&udm=2&fbs=ABzOT_CWdhQLP1FcmU5B0fn3xuWpA-dk4wpBWOGsoR7DG5zJBnsX62dbVmWR6QCQ5QEtPRrN1KFHti9EP_dqC742rxzHRLBZCil0j9azScQIqAr91H0azpWlTOGvHqYN60vyJ2ihJqn5K7z2yDfOB2vw89o4ZNd7xM0sxp6cI3Y8N6A3iV8yYjufHTimEM1gF4K8ZdWN-zxrwpbx5f0HbkI-Msu8h5KMsg&sa=X&ved=2ahUKEwiOsZjq6Y6MAxVXSWwGHTFqDIMQtKgLegQIExAB&biw=1536&bih=735&dpr=1.25#vhid=hCg6p3ZdYsKrEM&vssid=mosaic",
      image:
        "https://images.tractorgyan.com/uploads/113144/6646063953b35-top-central-government-schemes-in-india.webp",
    },
    {
      title: "Crop Rotation Strategies",
      description:
        "Maximize soil health and yield through effective crop rotation techniques.",
      date: "2024-03-12",
      link: "https://tractorguru.in/tractor-blog/government-schemes-to-promote-agriculture-in-india",
      image: "https://i.ytimg.com/vi/YxmIIaXtKeI/sddefault.jpg",
    },
    {
      title: "Vertical Farming Innovations",
      description:
        "Explore space-efficient farming solutions for urban environments.",
      date: "2024-03-11",
      link: "https://www.adda247.com/exams/agriculture/welfare-schemes-for-farmers-in-india/",
      image:
        "https://www.adda247.com/jobs/wp-content/uploads/sites/22/2024/05/17183038/welfare-schemes-for-farmers-in-India-Complete-List-01.png",
    },
    {
      title: "Climate-Resilient Crops",
      description:
        "Understanding plant varieties that thrive in changing climate conditions.",
      date: "2024-03-10",
      link: "https://tractorkarvan.com/blog/top-central-government-schemes-for-farmers-in-india",
      image:
        "https://cdn.tractorkarvan.com/tr:f-webp/images/Blogs/top-central-government-schemes-for-farmers-in-india/pm-kisan.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Agricultural Insights
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Stay updated with the latest trends and innovations in modern farming practices.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <a href={post.link} target="_blank" rel="noreferrer" key={index}>
          <BlogCard
            key={index}
            title={post.title}
            description={post.description}
            date={post.date}
            image={post.image}
          />
          </a>
        ))}
      </div>
    </div>
  );
}