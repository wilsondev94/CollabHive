"use client";

import { debounce } from "lodash";
import { useEffect, useState } from "react";

import { useSearchQuery } from "@/state/apiSlice";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import TaskCard from "@/components/TaskCard";
import ProjectCard from "@/components/ProjectCard";
import UserCard from "@/components/UserCard";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: searchResult,
    error,
    isLoading,
  } = useSearchQuery(searchQuery, { skip: searchQuery.length < 3 });

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, 500);

  useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch.cancel]);

  return (
    <div className="p-8">
      <Header name="Search" />
      <div>
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Search..."
          className="w-1/2 rounded border p-3 shadow"
        />
      </div>
      <div className="p-5">
        {isLoading && <Loading />}
        {error && <Error />}
        {!isLoading && !error && searchResult && (
          <div>
            {searchResult.tasks && searchResult.tasks.length > 0 && (
              <h2>Tasks</h2>
            )}

            {searchResult.tasks?.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}

            {searchResult.projects && searchResult.projects.length > 0 && (
              <h2>Projects</h2>
            )}

            {searchResult.projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            {searchResult.users && searchResult.users.length > 0 && (
              <h2>users</h2>
            )}

            {searchResult.users?.map((user) => (
              <UserCard key={user.userId} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
