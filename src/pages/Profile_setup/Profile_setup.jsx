import React from "react";
import "./Profile_setup.css";
import { Divider, Avatar, Input, Select, SelectItem, Button, Checkbox } from "@nextui-org/react";

const Profile = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="profile_set_up">
        {/* Tracker */}
      <div className="tracker">
        <Checkbox size="lg" color="secondary" isReadOnly defaultSelected radius="full">Sign Up</Checkbox>
        <Divider className="tracker_divider"/>
        <Checkbox size="lg" color="secondary" isReadOnly radius="full">Save Details</Checkbox>
        <Divider className="tracker_divider"/>
        <Checkbox size="lg" color="secondary" isReadOnly radius="full">Explore</Checkbox>
      </div>
      <div className="profile">
        {/* Profile left side */}
        <div className="left_profile">
          <div className="avatar">
            <Avatar className="aavatar" isBordered size="lg" color="secondary" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
          </div>
          <div className="lr1">
            <div style={{ width: '45%' }}>
              <Input
                key="outside"
                type="email"
                label="First Name"
                labelPlacement="outside"
                placeholder="Enter your first name"
              />
            </div>
            <div style={{ width: '45%' }}>
              <Input
                key="outside"
                type="email"
                label="Last Name"
                labelPlacement="outside"
                placeholder="Enter your last name"
              />
            </div>
          </div>
          <div className="lr2">
            <div style={{ width: '45%' }}>
              <Input
                key="outside"
                type="email"
                label="Email"
                labelPlacement="outside"
                placeholder="Enter your email"
              />
            </div>
            <div style={{ width: '45%' }}>
              <Input
                key="outside"
                type="phone"
                label="Phone"
                labelPlacement="outside"
                placeholder="Enter your Phone number"
              />
            </div>
          </div>
          <div className="lr3">
            <Input
              style={{ width: '100%' }}
              label="Password"
              labelPlacement="outside"
              variant="bordered"
              placeholder="Enter your password"
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />
          </div>
        </div>

        {/* Middle Line */}
        <Divider className="divider" orientation="vertical" />
        {/* Profile right side  */}
        <div className="right_profile">
          <div className="rr1">
            <div style={{ width: '45%' }}>
              <Input
                key="outside"
                type="date"
                label="Date of Birth"
                labelPlacement="outside"
                placeholder="wd"
              />
            </div>

            <div style={{ width: '45%' }}>
              <Select
                labelPlacement="outside"
                label="Gender"
                placeholder="Select gender"
                className="max-w-xs"
              >
                <SelectItem value='male'>
                  Male
                </SelectItem>
                <SelectItem value='male'>
                  Female
                </SelectItem>
              </Select>
            </div>
          </div>
          <div className="rr2">
            <Input
              label="Address"
              type="text"
              labelPlacement="outside"
              placeholder="Enter your Address"
            />
          </div>
          <div className="rr3">
            <div style={{ width: '45%' }}>
              <Input
                key="outside"
                type="text"
                label="City"
                labelPlacement="outside"
                placeholder="Enter your City"
              />
            </div>
            <div style={{ width: '45%' }}>
              <Input
                key="outside"
                type="text"
                label="State"
                labelPlacement="outside"
                placeholder="Enter your state"
              />
            </div>
          </div>
          <div className="rr4">
            <div style={{ width: '45%' }}>
              <Input
                key="outside"
                type="number"
                label="Zip Code"
                labelPlacement="outside"
                placeholder="Enter your zip code"
              />
            </div>
            <div style={{ width: '45%' }}>
              <Input
                key="outside"
                type="text"
                label="Country"
                labelPlacement="outside"
                placeholder="Enter your country"
              />
            </div>
          </div>
          <div className="rr5">
            <Button className="btn" color="secondary">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile