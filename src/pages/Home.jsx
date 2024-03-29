
import Button from "../components/Button"
import "../style/style.css"

function Home() {
  return (
    <>
      <section className=" bg-Hero bg-cover font-[ poppins] md:bg-top bg-center" >
        <div className="flex flex-col justify-center text-center items-center h-lvh">
          <h2 className=" text-white text-2xl font-medium">Feshion AaMeRaa</h2>
          <h1 className="md:text-3xl text-3xl font-semibold py-5 text-white">Items every people should have</h1>
          <div className="text-xl">
            <Button />
          </div>
        </div>
      </section>
    </>
  )
}

export default Home