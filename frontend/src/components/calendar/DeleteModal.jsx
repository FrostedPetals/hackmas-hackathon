import React from 'react'

//to confirm from the user if they want a particular event deleted
function DeleteModal({ isOpen, onCancel, onConfirm }) {
    var modal = document.getElementById('modal');

    if (!isOpen) return null

  return (
    <div>
            <div id="modal">
                <div
                    class="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto" onClick={onCancel}>
                    <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-6 relative">
                        

                        <div class="my-8 text-center">
                            
                            <div class="mt-6">
                                <h4 class="text-slate-900 text-lg font-semibold">Are you sure you want to delete it?</h4>
                            </div>
                        </div>

                        <div class="flex flex-col space-y-3">
                            <button type="button"
                                class="px-4 py-2 rounded-md cursor-pointer text-white text-sm font-medium tracking-wide bg-red-500 hover:bg-red-600 active:bg-red-500" onClick={onConfirm}>Delete</button>
                            <button id="closeButton" type="button"
                                class="px-4 py-2 rounded-md cursor-pointer text-slate-900 text-sm font-medium tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200" onClick={onCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default DeleteModal