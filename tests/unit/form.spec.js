import Input from '@/components/atoms/Input.vue'
import Form from '@/components/organism/Form.vue'
import {mount} from '@vue/test-utils'

describe("Check Input exists", ()=>{
    it("Check if the input exists in the form component", async()=>{
        const wrapper = mount(Form)
        const form = wrapper.find('form')
        const InputComponent = wrapper.find('input[name="email"]')
        await InputComponent.setValue('aditya@example.com')
        // expect(InputComponent.exists(true)).toBe(true)
        expect(InputComponent.element.value).toBe('aditya@example.com')
    })
})