import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useLoaderData } from "react-router-dom";

const FeaturedBlogs = () => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [wordCountFilter, setWordCountFilter] = useState("");

  const blogs = useLoaderData();

  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: (props) => <span>{props.getValue()}</span>,
        enableSorting: false,
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: (props) => <span>{props.getValue()}</span>,
        enableSorting: true,
      },
      {
        accessorKey: "authorName",
        header: "Author",
        cell: (props) => <span>{props.getValue()}</span>,
        enableSorting: false,
      },
      {
        accessorKey: "wordCount",
        header: "Total Words",
        cell: (props) => <span>{props.getValue()}</span>,
        enableSorting: true,
      },
    ],
    []
  );

  const data = useMemo(() => {
    return blogs.filter((blog) => {
      const categoryMatch = categoryFilter
        ? blog.category === categoryFilter
        : true;
      const wordCountMatch = wordCountFilter
        ? blog.wordCount.toString() === wordCountFilter
        : true;
      return categoryMatch && wordCountMatch;
    });
  }, [blogs, categoryFilter, wordCountFilter]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSorting: true,
  });

  const uniqueCategories = useMemo(
    () => [...new Set(blogs.map((blog) => blog.category))],
    [blogs]
  );
  const uniqueWordCounts = useMemo(
    () => [...new Set(blogs.map((blog) => blog.wordCount))],
    [blogs]
  );

  return (
    <div className="px-6 lg:px-16 py-16">
     
      <div className="flex flex-row gap-4 mb-6">
        <div className="flex flex-col md:items-center gap-2 w-full justify-center">
          <label className="md:text-lg font-medium dark:text-gray-300">Filter by Category:</label>
          <select
            className="input w-full input-bordered select  text-base  focus:ring focus:ring-indigo-300"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All</option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col md:items-center gap-2 w-full justify-center">
          <label className=" md:text-lg font-medium dark:text-gray-300">Filter by Word Count:</label>
          <select
            className="input w-full input-bordered select  text-base focus:ring focus:ring-indigo-300"
            value={wordCountFilter}
            onChange={(e) => setWordCountFilter(e.target.value)}
          >
            <option value="">All</option>
            {uniqueWordCounts.map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </div>
      </div>

    
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 text-left">
          <thead className="bg-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-2 text-center py-2 border border-gray-300"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.column.columnDef.header}
                   
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="even:bg-gray-100 dark:even:bg-gray-300 dark:odd:bg-indigo-50 odd:bg-indigo-50 transition"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 border border-gray-300"
                  >
                    {cell.getContext().renderValue()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
