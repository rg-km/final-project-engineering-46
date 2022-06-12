import React from "react";

function Card({ mapel, durasi, token, deadline }) {
  return (
    <>
      <div className="flex justify-start ml-20 mt-10">
        <a
          href="#"
          class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {mapel}
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            Durasi: {durasi} Menit
          </p>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            Token: {token}
          </p>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            Deadline: {deadline}
          </p>
        </a>
      </div>
    </>
  );
}

export default Card;
