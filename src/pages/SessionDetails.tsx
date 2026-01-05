export const SessionDetails = () => {
    return (
        <main>
            <h2 className="text-lg font-semibold text-text-primary mb-4">Session Details</h2>

            <form onSubmit={e => e.preventDefault()}
            className="flex flex-col items-start text-text-primary gap-3">

                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="session-name" className="text-text-muted">Session Name:</label>
                    <input id="session-name"
                           type="text"
                           onChange={e => e.preventDefault()}
                           className="rounded-lg focus:outline-none border border-blue-500 p-2 w-full"
                           placeholder="Enter Session Name"
                    />
                </div>


                <div className="flex flex-col gap-1 w-full">
                    <label className="text-text-muted">Duration</label>
                    <p>duration</p>
                </div>


                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="session-note" className="text-text-muted">Notes (optional):</label>
                    <textarea id="session-note"
                              maxLength={255}
                              onChange={e => e.preventDefault()}
                              className="rounded-lg h-32 focus:outline-none border border-blue-500 p-2 w-full"
                              placeholder="Something useful from your session"
                    />
                </div>

                <div className="flex flex-row-reverse justify-evenly w-full gap-2 mt-8">
                    <button type="submit"
                            className="w-1/2 rounded-lg bg-blue-600 text-text-primary p-3"
                    >Save Session</button>
                    <button type="submit"
                        className="w-1/2 rounded-lg border-2 border-red-800 text-red-800 font-semibold p-3"
                    >
                        Delete Session
                    </button>
                </div>

            </form>
        </main>
    )
}