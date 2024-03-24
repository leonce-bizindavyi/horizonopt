import Image from 'next/image'
import React from 'react'
import profileCharacter from "../../../public/character.png"

const AboutCoverSection = () => {
  return (
    <section className='w-full md:h-[75vh] border-b-2 border-solid border-dark dark:border-light flex flex-col md:flex-row items-center justify-center text-dark dark:text-light'>
        <div className='w-full md:w-1/2 h-full border-r-2 border-solid border-dark dark:border-light flex justify-center'> 
            <Image src={profileCharacter} alt="legend" 
            className='w-4/5  xs:w-3/4 md:w-full h-full object-contain object-center'
            priority
            sizes="(max-width: 768px) 100vw,(max-width: 1180px) 50vw, 50vw"
            />
        </div>

        <div className='w-full md:w-1/2 flex flex-col text-left items-start justify-center px-5 xs:p-10 pb-10 lg:px-16'>
            <h2 className='font-bold capitalize text-4xl xs:text-5xl sxl:text-6xl  text-center lg:text-left'>
            Emplois, Stages, Formation
            </h2>
            <p className='font-medium capitalize mt-4 text-base'>
            Notre mission est de fournir une plateforme inclusive et informative dédiée à la découverte et à la saisie d'opportunités éducatives, professionnelles et personnelles. Nous nous engageons à offrir à nos lecteurs un accès facile à des ressources de qualité qui les aideront à progresser dans leur parcours académique et professionnel, et à réaliser leurs aspirations personnelles.
            </p>
        </div>
    </section>
  )
}

export default AboutCoverSection