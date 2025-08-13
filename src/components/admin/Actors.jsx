export default function Actors() {
    return (
        <div className="grid grid-cols-4 gap-3 my-5">
            <div className="bg-white shadow dark:shadow dark:bg-secondary p-5 rounded h-20 overflow-hidden">
                <div className="flex cursor-pointer">
                    <img
                        className='w-20 aspect-square object-cover'
                        src="https://images.unsplash.com/photo-1735029660539-59df2bded95b?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                    />

                    <div className="px-2">
                        <h1 className="text-xl text-primary dark:text-white font-semibold">John Doe</h1>
                        <p className="text-primary dark:text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
