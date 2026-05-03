import React, { useContext, useEffect, useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import { LuSettings2 } from "react-icons/lu";
import { categories } from '../assets/data';
import Title from "../components/Title"
import { ShopContext } from "../context/ShopContext"
import Item from "../components/Item"
import Footer from "../components/Footer"
const Shop = () => {
  const { books } = useContext(ShopContext)

  const [category, setCategory] = useState([])
  const [sort, setSortType] = useState("relevant")
  const [filterBooks, setFilterbooks] = useState([])
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const itemsperPage = 10

  const toggleFilter = (value, setState) => {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    )
  }

  const applyFilters = () => {
    let filtered = [...books]

    if (search) {
      filtered = filtered.filter((book) =>
        book.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category.length) {
      filtered = filtered.filter((book) =>
        category.includes(book.category)
      )
    }

    return filtered
  }

  const applySorting = (bookList) => {
    let sorted = [...bookList]

    switch (sort) {
      case "low":
        return sorted.sort((a, b) => a.price - b.price)
      case "high":
        return sorted.sort((a, b) => b.price - a.price)
      default:
        return sorted
    }
  }

  useEffect(() => {
    let filtered = applyFilters()
    let sorted = applySorting(filtered)

    setFilterbooks(sorted)
    setCurrentPage(1)
  }, [category, sort, books, search])

  const getPagination = () => {
    const startIndex = (currentPage - 1) * itemsperPage
    const endIndex = startIndex + itemsperPage
    return filterBooks.slice(startIndex, endIndex)
  }

  const totalPages = Math.ceil(filterBooks.length / itemsperPage)

  return (
    <section className='mx-auto max-w-[1440px] bg-white px-6 lg:px-12'>
      <div className='pt-28'>

        {/* Search */}
        <div className='w-full max-w-2xl flex items-center justify-center'>
          <div className='inline-flex items-center justify-center bg-[#f8f6fb] overflow-hidden w-full rounded-full p-4 px-5'>
            <div className='text-lg cursor-pointer'><RiSearch2Line /></div>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder='Search here...'
              className='border-none outline-none w-full pl-4 bg-[#f8f6fb]'
            />

            <div className='flex items-center justify-center cursor-pointer text-lg border pl-2'>
              <LuSettings2 />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className='mt-12 mb-16'>
          <h4 className='mb-4 hidden text-[16px] md:text-[17px] font-bold'>
            Categories:
          </h4>

          <div className='flex justify-center sm:justify-start items-center flex-wrap gap-y-4 gap-x-12'>
            {categories.map((cat) => (
              <label key={cat.name}>
                <input
                  type="checkbox"
                  value={cat.name}
                  onChange={(e) =>
                    toggleFilter(e.target.value, setCategory)
                  }
                  className='hidden peer'
                />

                <div className='flex justify-center items-center flex-col gap-2 peer-checked:text-[#ffbcb1] cursor-pointer'>
                  <div className='bg-[#f8f6fb] h-20 w-20 flex items-center justify-center rounded-full'>
                    <img
                      src={cat.image}
                      alt="type of book images"
                      className='object-cover h-10 w-10'
                    />
                  </div>
                  <span className='font-medium'>{cat.name}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Books */}
        <div className='mt-8'>

          {/* Title + Sort */}
          <div className='flex items-center justify-between gap-7 flex-wrap pb-16 max-sm:justify-center text-center'>
            <Title
              title1={"Our"}
              title2={"Book List"}
              titleStyles={"pb-0 text-start"}
              paraStyles={"block!"}
            />

            <div className='flex items-center justify-center gap-x-2'>
              <span className='hidden sm:flex font-medium'>Sort by:</span>

              <select
                onChange={(e) => setSortType(e.target.value)}
                className='text-sm p-2.5 outline-none bg-[#f8f6fb] text-gray-800'
              >
                <option value="relevant">Relevant</option>
                <option value="low">Low</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'>
            {getPagination().length > 0 ? (
              getPagination().map((book) => (
                <Item book={book} key={book._id} />
              ))
            ) : (
              <p className='text-center w-full'>
                No books found for selected filters
              </p>
            )}
          </div>

        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center mb-10 gap-3 bg-gray-100 px-6 py-3 rounded-full">

          {/* Previous */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className={`font-medium bg-[#362cfb] text-white px-5 py-2 rounded-full 
            ${currentPage === 1 && "opacity-50 cursor-not-allowed"}`}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 flex items-center justify-center font-medium rounded-full transition-all duration-300
              ${
                currentPage === index + 1
                  ? "bg-[#ffbcb1] text-white shadow-md"
                  : "hover:bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className={`font-medium bg-[#362cfb] text-white px-5 py-2 rounded-full 
            ${currentPage === totalPages && "opacity-50 cursor-not-allowed"}`}
          >
            Next
          </button>

        </div>

      </div>

      <Footer/>
    </section>
  )
}

export default Shop