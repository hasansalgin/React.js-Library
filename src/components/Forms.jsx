import { useContext } from 'react'
import '../assets/styles/forms.scss'
import DataContext from '../context/DataContext'

const Forms = () => {
  const {
          handleSubmit,
          state,dispatch  
        } = useContext(DataContext);
  //buradaki yapılar context'e taşındı!
  return (
    <form onSubmit={handleSubmit}>
      <h3>{state.secilenKitap?"Kitap Düzenle":"Kitap Ekle"}</h3>
      <input value={state.kitapAdi} onChange={(e)=>{dispatch({type:"kitapAdi", payload:e.target.value})}} type="text" placeholder='Kitap Adı' />
      <input value={state.kitapYazari} onChange={(e)=>{dispatch({type:"kitapYazari", payload:e.target.value})}} type="text" placeholder='Kitap Yazarı' />
      <select value={state.kitapKategorisi} onChange={(e)=>{dispatch({type:"kitapKategorisi", payload:e.target.value})}}>
        <option>--Kategori Seçiniz--</option>
        <option>Yazılım</option>
        <option>Edebiyat</option>
        <option>Tarih</option>
        <option>Diğer</option>
      </select>
      <input value={state.kitapResmi} onChange={(e)=>{dispatch({type:"kitapResmi", payload:e.target.value})}} type="text" placeholder='Kitap Resmi(url)'/>
      <input value={state.kitapSayfaSayisi} onChange={(e)=>{dispatch({type:"kitapSayfaSayisi", payload:e.target.value})}} type="number" placeholder='Sayfa sayısı'/>
      <textarea value={state.kitapAciklamasi} onChange={(e)=>{dispatch({type:"kitapAciklamasi", payload:e.target.value})}} placeholder='Kitap Açıklaması'></textarea>
      <input disabled={state.kitapAdi==="" || state.kitapYazari==="" || state.kitapKategorisi ==="--Kategori Seçiniz--" || state.kitapAciklamasi==="" || state.kitapSayfaSayisi=== 0} type="submit" value={state.secilenKitap?"Düzenle":"Ekle"} />
    </form>
  )
}

export default Forms