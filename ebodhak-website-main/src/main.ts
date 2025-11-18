import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faGraduationCap,
  faBook,
  faVideo,
  faClipboardList,
  faUsers,
  faChartLine,
  faComments,
  faMobileAlt,
  faTrophy,
  faCog,
  faStethoscope,
  faBriefcase,
  faFlask,
  faLaptopCode,
  faLandmark,
  faStar,
  faCheck,
  faFilter,
  faSearch,
  faClock,
  faUserGraduate,
  faPlay,
  faDownload,
  faHeart,
  faShare,
  faChevronDown,
  faChevronUp,
  faCircleCheck,
  faBolt,
  faInfinity,
  faHeadset,
  faCertificate,
  faCalendar,
  faFileAlt,
  faQuestionCircle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'

library.add(
  faGraduationCap,
  faBook,
  faVideo,
  faClipboardList,
  faUsers,
  faChartLine,
  faComments,
  faMobileAlt,
  faTrophy,
  faCog,
  faStethoscope,
  faBriefcase,
  faFlask,
  faLaptopCode,
  faLandmark,
  faStar,
  faCheck,
  faFilter,
  faSearch,
  faClock,
  faUserGraduate,
  faPlay,
  faDownload,
  faHeart,
  faShare,
  faChevronDown,
  faChevronUp,
  faCircleCheck,
  faBolt,
  faInfinity,
  faHeadset,
  faCertificate,
  faCalendar,
  faFileAlt,
  faQuestionCircle,
  faExclamationCircle,
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
)

// Add additional icons
import {
  faChevronRight,
  faChevronLeft,
  faLightbulb,
  faTimesCircle,
  faCheckCircle,
  faRedo,
  faList,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faChevronRight,
  faChevronLeft,
  faLightbulb,
  faTimesCircle,
  faCheckCircle,
  faRedo,
  faList,
  faCreditCard,
)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)

app.mount('#app')