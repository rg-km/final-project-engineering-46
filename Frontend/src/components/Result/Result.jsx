import React, { useState, useEffect } from 'react'
import NavbarToken from '../Navbar/NavbarToken'
import Image from '../../assets/images.jpg'
import Button from '../Soal/Button/Button'
import './result.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const Result = () => {
  const [status, setStatus] = useState()
  const [mapel, setMapel] = useState()
  const [nilai, setNilai] = useState()

  const MySwal = withReactContent(Swal)
  const navigate = useNavigate()

  const idmapel = localStorage.getItem('id_mapel')
  const intIdMapel = parseInt(idmapel)
  const jawaban = JSON.parse(localStorage.getItem('jawabans'))
  // const arrJawaban = jawaban.split(':')
  console.log("IDmapel", intIdMapel)
  console.log("jawaban", jawaban)
  const showNilaiSiswa = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/siswa/nilai',
        {
          id_mata_pelajaran: intIdMapel,
          jawabans: jawaban
        },
        {
          headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
          }
        }
      )
      const resShowNilai = res.data.data
      console.log("Nilai siswa", resShowNilai)

      setStatus(resShowNilai.status)
      setMapel(resShowNilai.mata_pelajaran)
      setNilai(resShowNilai.nilai)
    } catch (error) {
      console.log("Gagal fetch nilai siswa", error)
      navigate('/login')
    }
  }

  useEffect(() => {
    showNilaiSiswa()
  }, [])

  console.log("NIlai", nilai)

  const handleLogout = () => {
    MySwal.fire({
      title: 'Log Out Berhasil',
      icon: 'success',
    })
    localStorage.clear()
    navigate('/login')
  }

  return (
    <> 
      <NavbarToken logo=".ET" username="John" image={Image} />
      <div className="card mx-auto mt-16 py-2 shadow-2xl px-4">
        <div className="circle bg-primary text-center mt-10 border-2 mx-auto border-primary border-solid">
          <h1 className='mt-12 font-bold text-5xl'>{nilai}</h1>
          <p>Nilai anda</p>
        </div>
        {status === "Lulus" 
          ? 
            <div>
              <h1 className='font-bold text-center mt-2 text-2xl text-lulus'>Selamat</h1>
              <div className='mt-2'>
                <p className='text-center'>Anda telah lulus dalam mata pelajaran {mapel}</p>
              </div>
            </div>
          :
            <div>
              <h1 className='font-bold text-center mt-2 text-2xl text-gagal'>Mohon maaf!</h1>
              <div className='mt-2'>
                <p className='text-center'>Anda tidak lulus dalam mata pelajaran {mapel}</p>
              </div>
            </div>
        }
        <div className='flex justify-center mt-4'>
          <button onClick={handleLogout} className="hover:bg-primary border border-solid text-primary border-primary p-1 w-28 text-center rounded-2xl hover:text-white">
            <a href="/login">Selesai</a>
          </button>
        </div>
      </div>
    </>
  )
}

export default Result