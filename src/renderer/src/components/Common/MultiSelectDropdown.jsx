import PropTypes from 'prop-types'
import { useEffect, useState, useRef } from 'react'

import useErrorStore from '../../store/useErrorStore'
import useMinimiStore from '../../store/useMinimiStore'
import useReadMinimiStore from '../../store/useReadMinimiStore'

import Loading from '../Common/Loading'
import { MAX_SELECT_AUTORUN } from '../../constants/constants'

const MultiSelectDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([])

  const { setToastMessage, setVisible, isLoading, setLoading } = useErrorStore()
  const { executables, setExecutables } = useMinimiStore()
  const { executeOptions } = useReadMinimiStore()

  const dropdownRef = useRef(null)

  const handleToggle = () => setIsOpen(!isOpen)

  const handleCheckboxChange = (e) => {
    const value = e.target.value
    setSelectedOptions((prev) => {
      if (prev.includes(value)) {
        return prev.filter((v) => v !== value)
      } else {
        if (prev.length < MAX_SELECT_AUTORUN) {
          return [...prev, value]
        } else {
          setToastMessage(`${MAX_SELECT_AUTORUN}개 까지만 선택할 수 있습니다.`)
          setVisible(true)
          return prev
        }
      }
    })
  }

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (executables && executables.length > 0) {
      setSelectedOptions(executables)
    }
  }, [executables])

  useEffect(() => {
    setExecutables(selectedOptions)
  }, [selectedOptions, setExecutables])

  useEffect(() => {
    setLoading(true)
    if (executeOptions.length > 0) {
      setLoading(false)
    }
  }, [executeOptions])

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="text-base font-medium leading-7 border rounded bg-black text-white px-2 cursor-pointer hover:bg-neutral-700 truncate flex items-center justify-between w-full"
      >
        {selectedOptions.length > 0 ? `${selectedOptions.length} selected` : 'Select files'}
        <span className={`ml-2 ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform`}>
          &#9662;
        </span>
      </button>
      {isOpen && (
        <div className="bg-white border border-gray-300 shadow-lg mt-1 rounded-md w-full max-h-[200px] overflow-y-auto">
          {!isLoading ? (
            <>
              <button className="w-full block px-4 py-1 bg-gray-100 font-medium hover:bg-black hover:text-white text-sm font-normal sticky top-0">
                + Add File
              </button>
              {executeOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex align-center block px-4 py-2 hover:bg-gray-100 text-sm font-normal"
                >
                  <input
                    type="checkbox"
                    value={option.value}
                    onChange={handleCheckboxChange}
                    checked={selectedOptions.includes(option.value)}
                    className="cursor-pointer mr-3 bg-gray-300 accent-black"
                  />
                  {option.label}
                </label>
              ))}
            </>
          ) : (
            <Loading />
          )}
        </div>
      )}
    </div>
  )
}

MultiSelectDropdown.propTypes = {
  options: PropTypes.array
}

export default MultiSelectDropdown
