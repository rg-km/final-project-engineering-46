import React, { useState } from "react";
import axios from "axios";
import { useEffect, useRef } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function NewForm() {
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [kkm, setKkm] = useState(0);
  const [duration, setDuration] = useState(0);
  const [mataPelajaran, setMataPelajaran] = useState("");
  const [submit, setSubmit] = useState({});
  const [token, setToken] = useState("");
  const [copy, setCopy] = useState()
  const textAreaRef = useRef(null);

  const MySwal = withReactContent(Swal)

  const handleInputDate = (e) => {
    setDate(e.target.value);
  };

  const handleInputTime = (e) => {
    setTime(e.target.value);
  };
  const timeDate = `${date} ${time}`;

  const kkmInt = parseInt(kkm);
  const durationInt = parseInt(duration);

  const currentUrl = window.location.href;
  const arrCurrentUrl = currentUrl.split("/");
  const numCurrentUrl = parseInt(arrCurrentUrl[5]);
  const idmapel = numCurrentUrl;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/guru/create/ujian",
        {
          id_mata_pelajaran: idmapel,
          kkm: kkmInt,
          durasi: durationInt,
          deadline: timeDate,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        MySwal.fire({
          title: 'Berhasil Membuat Ujian',
          icon: 'success',
        })
      const resCreateUjian = res.data.data
      console.log("Respon Create Soal", resCreateUjian);
      setToken(resCreateUjian);
    } catch (err) {
      console.log("Gagal post data", err);
    }
  };

  return (
    <>
      <div className="flex-1 justify-center mx-5 my-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="p-4">
            <form onSubmit={handleSubmit}>
              <div class="mb-6">
                <label
                  for="id_mata_pelajaran"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Mata Pelajaran
                </label>
                <input
                  type="text"
                  id="id_mata_pelajaran"
                  name="id_mata_pelajaran"
                  onChange={(e) => setMataPelajaran(e.target.value)}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Isi dengan nama Mata Pelajaran"
                />
              </div>
              <div class="grid gap-6 mb-6 lg:grid-cols-2">
                <div>
                  <label
                    htmlFor="kkm"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    KKM
                  </label>
                  <input
                    type="number"
                    id="kkm"
                    name="kkm"
                    // value={submit.kkm || ""}
                    onChange={(e) => setKkm(e.target.value)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nilai KKM"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="durasi"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Durasi
                  </label>
                  <input
                    type="number"
                    id="durasi"
                    name="durasi"
                    step="1"
                    // value={submit.durasi || ""}
                    onChange={(e) => setDuration(e.target.value)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Durasi Pengerjaan"
                    required
                  />
                </div>
                <div>
                  <label
                    for="deadline_date"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Deadline Date
                  </label>
                  <input
                    type="date"
                    id="deadline_date"
                    onChange={handleInputDate}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    for="deadline_time"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Deadline Time
                  </label>
                  <input
                    type="time"
                    id="deadline_time"
                    onChange={handleInputTime}
                    step="1"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                class="text-white border border-gray-300 bg-blue-700 hover:bg-blue-800 text-sm rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium block w-full p-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-5"
              >
                Create Ujian
              </button>
            </form>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Nama Mata Pelajaran
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Token
                    </th>
                    <th scope="col" class="px-6 py-3">
                      <span class="sr-only">Copy</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      {mataPelajaran}
                    </th>
                    <td>{token.token_ujian}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewForm;
