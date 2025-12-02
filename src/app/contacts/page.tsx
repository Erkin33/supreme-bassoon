import Header from "@/components/header"
import Footer from "@/components/Footer"
export default function Contacts(){
    return(
        <div className="max-w-[1140px] h-full flex flex-col mx-auto pt-[17px] ">
              <Header />
              {/* Обёртка сделана relative + overflow-visible — только это изменено */}
              <div className="relative overflow-visible bg-[#02A653]">
                
              </div>
              <Footer/>
        </div>
    )
}