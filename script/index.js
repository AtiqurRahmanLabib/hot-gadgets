const loadPhones = async (inputText='a', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`)
    const data = await res.json()
    const phones = data.data
    displayPhones(phones, isShowAll)
}
const handleSearch = (isShowAll) => {
    const inputFeild = document.getElementById('input-feild')
    const inputText = inputFeild.value
    loadPhones(inputText, isShowAll)
    toggleSPiner(true)
}
document.addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        handleSearch()
    }
})
const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container')
    if (phones.length > 12 && !isShowAll) {
        const showMoreBtn = document.getElementById('showMore')
        showMoreBtn.classList.remove('hidden')
    }
    else {
        const showMoreBtn = document.getElementById('showMore')
        showMoreBtn.classList.add('hidden')
    }
    if (!isShowAll) {
        phones = phones.slice(0, 12)
    }
    phoneContainer.textContent = '';
    phones.forEach(phone => {
        const phoneCard = document.createElement('div')
        phoneCard.classList = `card bg-base-100 w-[364px] h-[490px] shadow-xl text-center border rounded-3xl`
        phoneCard.innerHTML = `
          <figure>
                    <div class="flex justify-center mt-4">
                    <img class=""  src="${phone.image}" />
                    </div>
                </figure>
                <div class="card-body h-full mt-9">
                    <h2 class=" card-title font-bold text-[25px] text-[#706F6F]">${phone.phone_name}</h2>
                    <p class=" text-[18px] text-[#706F6F]">There are many variations of passages of available, but the majority have suffered</p>
                    <div class="card-actions justify-end">
                        <p class="text-[#706F6F] font-bold text-[25px]">$999</p>
                        <button onclick="handleShowDetails('${phone.slug}'); openModal();" class="bg-[#0D6EFD] rounded-lg text-white w-[140px] mt-5 font-bold h-[50px]">Show Details</button>
                    </div>
        `
        phoneContainer.appendChild(phoneCard)
    });
    toggleSPiner(false)
}
const toggleSPiner = (isLoading) => {
    const lodingSpiner = document.getElementById('loading-spinner')
    if (isLoading) {
        lodingSpiner.classList.remove('hidden')
    }
    else {
        lodingSpiner.classList.add('hidden')
    }
}
const showAll = (isShowAll) => {
    handleSearch(true)
}
const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phone = data.data
    console.log(phone)
    handleModal(phone)
} 
const handleModal = (phone) =>{
    const phoneName = document.getElementById('phone-name')
    phoneName.innerText = phone.name
    const storage = document.getElementById('storage')
    storage.innerText = phone.mainFeatures.storage
    const displaySize = document.getElementById('display-size')
    displaySize.innerText = phone.mainFeatures.displaySize
    const chipset = document.getElementById('chipset')
    chipset.innerText = phone.mainFeatures.chipSet
    const memory = document.getElementById('memory')
    memory.innerText = phone.mainFeatures.memory
    const slug = document.getElementById('slug')
    slug.innerText = phone.slug
    const releaseDate = document.getElementById('release-date')
    releaseDate.innerText = phone.releaseDate
    const brand = document.getElementById('brand')
    brand.innerText = phone.brand
    const gps = document.getElementById('gps')
    gps.innerText = phone.others.GPS
}
 function openModal() {
    document.getElementById("modal").style.display = "flex";
  }
  function closeModal() {
    document.getElementById("modal").style.display = "none";
  }
  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      closeModal();
    }
  });
  loadPhones()