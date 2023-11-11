import "./Navbar.css";
import { Select, SelectItem, Avatar, Input, Image } from "@nextui-org/react";

import logo from "../../assets/navlogo.svg";

const Navbar = () => {
  const avatarSrc = "https://i.pravatar.cc/150?u=a042581f4e29026704d";
  return (
    <div className="navbar">
      <div>
        <Image
          isBlurred
          width={100}
          src={logo}
          alt="NextUI Album Cover"
          classNames="m-5"
        />
      </div>
      <div>
        <Select size='sm' defaultSelectedKeys={["dadar"]} startContent={<i className="fa-solid fa-location-dot"></i>} >
          <SelectItem key='dadar' value='dadar'>
            Dadar,Mumbai
          </SelectItem>
        </Select>
      </div>


      <div className="features">
        <div className="graduation">
          <i className="fa-solid fa-graduation-cap"></i>
          <Select
            size='sm'
            label="Services"
            variant='underlined'
            className="max-w-xs"
          >
            <SelectItem key='dadar' value='dadar'>
            Dadar, Mumbai
            </SelectItem>
          </Select>
        </div>
        <div className="message">
          <i className="fa-solid fa-message"></i>
          <div>message</div>
        </div>
        <div className="bell">
          <i className="fa-solid fa-bell"></i>
          <div>notification</div>
        </div>
      </div>


      <div>
        <Input
          size='sm'
          // label="Search"
          isClearable
          radius="lg"
          classNames={{
            label: "text-black/50 dark:text-white/90",

          }}
          placeholder="Type to search..."
          startContent={
            <i className="fa-solid fa-magnifying-glass"></i>
          }
        />
      </div>
      <div>
        <Select
          size='sm'
          className="max-w-xs"
          style={{ width: '200px' }}
          renderValue={() => (
            <Avatar size="sm" isBordered color="secondary" src={avatarSrc} />
          )}
        >
          <SelectItem key='dadar' value='dadar'>
            <Avatar isBordered color="secondary" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />Dadar, Mumbai
          </SelectItem>
        </Select>
      </div>
    </div>
  )
}

export default Navbar