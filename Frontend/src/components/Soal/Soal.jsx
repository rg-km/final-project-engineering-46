import React, { useState, useEffect } from 'react'
import Images from '../../assets/images.jpg'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import Card from './CardSoal/Card'
import Daftar from './DaftarSoal/Daftar'


function Soal() {
  const [soals, setSoals] = useState([]);
  const [currentPage, setCurrentPage] = useState(false)
  const [soalsPerPage] = useState(1)
  const [answer, setAnswer] = useState([])

  useEffect(() => {
    const fetchSoals = async () => {
      const res = await axios.get('http://localhost:8000/soal')
      setSoals(res.data)
    }

    fetchSoals();
  }, [])

  // Get current soal
  const indexOfLastSoal = currentPage * soalsPerPage;
  const indexOfFirstSoal = indexOfLastSoal - soalsPerPage;
  const currentSoals = soals.slice(indexOfFirstSoal, indexOfLastSoal)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const handleOnAnswer = (selectedAnswer) => {
    setAnswer((prev) => [prev, ...selectedAnswer])
  }

  return (
    <>
      <Navbar
        logo=".ET"
        countdown="02:00:00"
        username="John"
        image={Images}
      />
      <div className='flex justify-center mt-10 ml-9'>
        <Card soals={currentSoals} onAnswer={(selectedAnswer) => setAnswer((prev) => [prev, ...selectedAnswer])} />
        <Daftar
          soalsPerPage={soalsPerPage}
          totalSoals={soals.length}
          paginate={paginate}
        />
      </div>
    </>
  )
}

export default Soal