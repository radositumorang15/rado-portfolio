import { useEffect, useState } from "react";

export const Blog = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("https://67b777d02bddacfb270f0a77.mockapi.io/api/v1/articles")
            .then((response) => response.json())
            .then((data) => setPosts(data))
            .catch((error) => console.error("Error fetching articles:", error));
    }, []);

    return (
        <div className=" py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-4xl font-semibold tracking-tight text-pretty text-blue-500 sm:text-5xl">
                        Blog
                    </h2>
                </div>
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className="flex max-w-xl flex-col items-start justify-between"
                        >
                            <div className="flex items-center gap-x-4 text-xs">
                                <time className="text-gray-50">{post.date}</time>
                                <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
                                    {post.category}
                                </span>
                            </div>
                            <div className="group relative">
                                <h3 className="mt-3 text-lg/6 font-semibold text-blue-500 group-hover:text-gray-600">
                                    {post.title}
                                </h3>
                                <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                                    {post.description}
                                </p>
                            </div>
                            <div className="relative mt-8 flex items-center gap-x-4">
                                <img
                                    alt=""
                                    src={post.author_imageUrl}
                                    className="size-10 rounded-full bg-gray-50"
                                />
                                <div className="text-sm/6">
                                    <p className="font-semibold text-blue-500">{post.author_name}</p>
                                    <p className="text-gray-600">{post.author_role}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <a
                                    href={post.link}
                                    target="_blank"  
                                    rel="noopener noreferrer" 
                                    className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                                >
                                    View Article →
                                </a>
                            </div>

                        </article>

                    ))}
                </div>
            </div>
        </div>
    );
};
