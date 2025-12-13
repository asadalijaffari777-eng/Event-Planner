export default function Cards({ image, title, description, link }) {
  return (
    <li className="w-full sm:w-1/2 lg:w-1/4 p-4">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-[#111827] transition-transform duration-300"
        style={{
          boxShadow: "0 4px 20px rgba(153, 114, 218, 0.5)", // #9972da shadow
        }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300">{description}</p>
        </div>
      </a>
    </li>
  );
}
