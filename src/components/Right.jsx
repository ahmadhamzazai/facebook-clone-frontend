import React from "react";
import "../styles/Right.css"; // make sure this is imported!
import { BsSearch } from "react-icons/bs";
import { TbDots } from "react-icons/tb";

const Right = () => {
  return (
    <div className="div-scrollbar py-4 px-1 min-w-[280px] max-w-[280px] space-y-4 h-full overflow-y-scroll">
      {/* Sponsored */}
      <div className="py-1">
        <h4 className="font-semibold mb-2 text-[#6B6E73] dark:text-[#A4A7AB]">
          Sponsored
        </h4>
        <div className="adds flex flex-col gap-4">
          <div className="flex justify-start items-center gap-2 dark:hover:bg-[#484848] cursor-pointer rounded-lg p-2">
            <img
              src="https://scontent.fisb5-2.fna.fbcdn.net/v/t45.1600-4/502905070_710341844809471_6088147676139445114_n.jpg?stp=cp0_dst-jpg_p296x100_q75_spS444_tt6&_nc_cat=110&ccb=1-7&_nc_sid=c02adf&_nc_eui2=AeGULk-yRXToetC7S6fBjI9YHRcu9Zjs3JAdFy71mOzckCdE9VZ8DXSB1Qr1EFmDC-GnZ7RXnQQxu5NMZXMr_tjs&_nc_ohc=umlga8Hs7BMQ7kNvwHGH0PR&_nc_oc=AdnbRIjieyAZ-RmEEVP5MuTf6gIyoj3POJ1W145CRryWitYsQshK7AP60nbQ5isBaS0&_nc_zt=1&_nc_ht=scontent.fisb5-2.fna&_nc_gid=vSbCkVQRINAZrW6itz10xw&oh=00_AfRc-jnAhYWXgB95n5fNeVJLjSzKGzsXGVAqakycHG7-FQ&oe=687977A7"
              className="w-[100px] rounded h-[100px] object-cover"
              alt="sponsor"
            />
            <div className="flex flex-col gap-2">
              <div className="text-[14px] font-semibold dark:text-[#CDD0D3]">
                Last Data to Apply: July 26th
              </div>
              <span className="text-sm text-gray-400 dark:text-[#A4A7AB]">
                uol.edu.pk
              </span>
            </div>
          </div>

          <div className="flex justify-start items-center gap-2 dark:hover:bg-[#484848] cursor-pointer rounded-lg p-2">
            <img
              src="https://scontent.fisb5-2.fna.fbcdn.net/v/t45.1600-4/516461857_2337020020026945_5691955512684170685_n.jpg?stp=dst-jpg_p476x249_tt6&_nc_cat=110&ccb=1-7&_nc_sid=11850a&_nc_eui2=AeGPSOMVV6gVDhZwtjNL8NFQjxBG8pTKKgiPEEbylMoqCPQ5QMRaE-BF-mv98eECSjULWsavaqk9_MFlMnFAjaWh&_nc_ohc=BVxIoQ90N7oQ7kNvwFazJ7W&_nc_oc=Adk-EkXmcf5IGhibAAtde0YNjTkeLoUHBsRyDwF-DCyB2OmkgYz9aBludZJJ63OEAfE&_nc_zt=1&_nc_ht=scontent.fisb5-2.fna&_nc_gid=jjj1uczbhNYqZ2CPPDSlwg&oh=00_AfS1k3Uad4T0LvKus_kizkA2B-lBCSR6VrgkGGHT7lNMYA&oe=68797317"
              className="w-[100px] rounded h-[100px] object-cover"
              alt="sponsor"
            />
            <div className="flex flex-col gap-2">
              <div className="text-[14px] font-semibold dark:text-[#CDD0D3]">
                Still time to apply
              </div>
              <span className="text-sm text-gray-400 dark:text-[#A4A7AB]">
                qub.ac.uk
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[1px] w-full bg-gray-600 "></div>
      {/* Friend Requests */}
      <div className="rounded-xl flex flex-col pr-2">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold mb-2 text-[#6B6E73] dark:text-[#A4A7AB]">
            Friend Requests
          </h4>
          <p className="text-blue-500 dark:text-blue-400 text-[14px] font-semibold cursor-pointer p-2 dark:hover:bg-[#333334] hover:bg-gray-200 rounded-md">
            See all
          </p>
        </div>
        <div className="flex items-center justify-start gap-3 single-request hover:bg-gray-200 dark:hover:bg-[#333334] cursor-pointer p-3 rounded-md">
          <div className="flex flex-col items-center justify-center">
            <div className="w-[40px] h-[40px] bg-gray-800 rounded-full overflow-hidden">
              <img
                src="https://scontent.fisb5-2.fna.fbcdn.net/v/t39.30808-6/515937738_122098520306939272_6034903656653692882_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHgYCdB0vzNk1P0-KhM7hi2BmlVwI43yREGaVXAjjfJETIiTNL6OlzOSw3UH5yeuJWDzwzjM5qL2Fbx8HUg1OpY&_nc_ohc=fwSket_hpaIQ7kNvwHSqmd9&_nc_oc=Adk7qQCoKpcHleYwMYjoOYTkMVyQqN_xqapaJCHG4OLCX78WTFCGLXSZdhRTSr-iuYI&_nc_zt=23&_nc_ht=scontent.fisb5-2.fna&_nc_gid=ESpNMKgmAuO2ruQkLqiYlQ&oh=00_AfShS-jZbOG8C8Wmg1pocyyw81VFAPvEELzpl9gSjwM73A&oe=687999C7"
                alt="friend"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex justify-start flex-col gap-1 w-full">
            <div className="flex justify-between">
              <p className="text-[14px] font-semibold dark:text-[#CDD0D3]">
                Mati Ullah
              </p>
              <span className="text-sm text-gray-500 dark:text-[#A4A7AB]">
                2d
              </span>
            </div>
            <div className="flex justify-start gap-2 pb-1 items-center">
              <div className="w-[15px] h-[15px] bg-gray-700 rounded-full"></div>
              <span className="text-xs text-gray-500 dark:text-[#A4A7AB]">
                26 mutual friends
              </span>
            </div>
            <div className="flex justify-start gap-2">
              <button className="text-white bg-[#0866FF] w-full py-2 dark:text-[#E4E6EA] text-sm font-bold rounded-md">
                Confirm
              </button>
              <button className="bg-gray-300 w-full py-2 dark:text-[#E4E6EA] dark:bg-[#333334] delete-request text-sm font-bold rounded-md">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[1px] w-full bg-gray-600 "></div>

      <div className="">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold mb-2 text-[#6B6E73] dark:text-[#A4A7AB]">
            Contacts
          </h4>
          <div className="flex justify-center gap-5 text-[15px] text-gray-600 font-bold">
            <div className="flex justify-center items-center p-2 cursor-pointer hover:bg-gray-200 dark:text-[#A4A7AB] dark:hover:bg-[#333334] rounded-full">
              <BsSearch />
            </div>
            <div className="flex justify-center items-center p-2 cursor-pointer hover:bg-gray-200 dark:text-[#A4A7AB] dark:hover:bg-[#333334] rounded-full">
              <TbDots />
            </div>
          </div>
        </div>
        <div className="live-contacts flex flex-col gap-2">
          <div className="live-contact flex items-center gap-3 p-2 hover:bg-gray-200  dark:hover:bg-[#333334] rounded-lg cursor-pointer">
            <div className="relative w-[35px] h-[35px] bg-gray-600 rounded-full">
              <div className=" overflow-hidden">
                <img
                  src="https://scontent.fisb6-2.fna.fbcdn.net/v/t39.30808-6/494141796_122228644346076669_8184526806547680846_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEIgYe2iiUb4OrwzLDnGJgWSY9qgcOnRLhJj2qBw6dEuAy2Z0jUUqX-KuGKNhhGv4fcPSLxhx-abcIEJAENf5_j&_nc_ohc=-sNhYeHIS1kQ7kNvwEOT45V&_nc_oc=AdnTrg8936Iq6cFlIMIc6LUVD5lV8XHYhKW482v5fhwKfDemzHjhwWZQs3mcnOjTfsI&_nc_zt=23&_nc_ht=scontent.fisb6-2.fna&_nc_gid=zprobILHSH_pByPuIrPMOQ&oh=00_AfStEfkCkF2oIw73xcg-SUBgXlou3K3tCiowcwMOJlmKJA&oe=6879A778"
                  alt="contact"
                  className="rounded-full"
                />
              </div>
              <span className="absolute bottom-1 right-0 w-[8px] h-[8px] bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <p className="text-[14px] font-semibold dark:text-[#CDD0D3]">
              Imran Khan
            </p>
          </div>
          <div className="live-contact flex items-center gap-3  p-2 hover:bg-gray-200 dark:hover:bg-[#333334]  rounded-lg cursor-pointer">
            <div className="relative w-[35px] h-[35px] bg-gray-600 rounded-full">
              <div className=" overflow-hidden">
                <img
                  src="https://scontent.fisb5-2.fna.fbcdn.net/v/t39.30808-6/241800468_375404234262048_8691808897636015404_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHSJzDRjjVK55fdr1HI0--qNA9mDL-i7Ws0D2YMv6Lta-dNfIIlnUC9Z4cWShI0QGMhpbD0GTCoEZGgM1pR_VcZ&_nc_ohc=Cf2n_nHOeTEQ7kNvwGvFwTT&_nc_oc=Adl9Eo0aTVUSD4ryyh0jln3QFLaVVD64IEFGZO-MwAKilozTz7gKYxMdLEtqTKO10mk&_nc_zt=23&_nc_ht=scontent.fisb5-2.fna&_nc_gid=T_nEUYsd7NQn62s-4PetjQ&oh=00_AfSvqdBl9spgRdTz8S0E-0pKiTPnVfBo3PFiW_uoWamang&oe=6879B92D"
                  alt="contact"
                  className="rounded-full"
                />
              </div>
              <span className="absolute bottom-1 right-0 w-[8px] h-[8px] bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <p className="text-[14px] font-semibold dark:text-[#CDD0D3]">
              Mohammad Sahil Jogezai
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Right;
