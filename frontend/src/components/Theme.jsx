import { PaletteIcon } from 'lucide-react';
import {useTheme} from '../store/useTheme.js'
import { THEMES } from '../utils/constant.js';
const Theme = () => {
    const {theme,setTheme} = useTheme();

  return (
    <div className='dropdown dropdown-end'>
      <button tabIndex={0} className='btn btn-ghost btn-circle'>
        <PaletteIcon className='size-5'/>
      </button>

      <div tabIndex={0} className='dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-xl rounded-2xl w-56 border border-base-content/10 max-h-80 overflow-y-auto'>
      <div className="space-y-1">
        {THEMES.map((e)=>(
            <button key={e.name} className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${
              theme === e.name? "bg-primary/20 text-primary" : "hover:bg-base-content/5"
            }`} onClick={()=> setTheme(e.name)}>
              <PaletteIcon className='size-4'/> <span className="font-medium text-sm">{e.name}</span>
              {/* THEME PREVIEW COLORS */}
              <div className="ml-auto flex gap-1">
                {e.colors.map((color,i)=>(
                  <span key={i}
                  className="size-2 rounded-full"style={{backgroundColor:color}}>
                  </span>
                ))}
              </div>
            </button>
        ))}
      </div>
      </div>
    </div>
  )
}

export default Theme
