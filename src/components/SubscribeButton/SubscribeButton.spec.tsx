import { render, screen, fireEvent } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { SubscribeButton } from '.'

jest.mock("next-auth/react")
jest.mock("next/router")

describe("SubscribeButton component", () => {
  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated"
    })

    render(
      <SubscribeButton />
    )

    expect(screen.getByText("Subscribe now")).toBeInTheDocument()
  })

  it("redirects user to sign in when not authenticated", () => {
    const singInMocked = mocked(signIn)

    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated"
    })

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText("Subscribe now")

    fireEvent.click(subscribeButton)

    expect(singInMocked).toHaveBeenCalled()
  })

  it("redirects to posts when user already has a subscription", () => {
    const useRouterMocked = mocked(useRouter)
    const useSessionMocked = mocked(useSession)
    const pushMocked = jest.fn()

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "John Doe",
          email: "john.dow@example.com"
        },
        activeSubscription:  "fake-active-Subscription",
        expires: "fake-expires",
      },
      status: "authenticated"
    })

    useRouterMocked.mockImplementationOnce(() => ({ push: pushMocked } as any));

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText("Subscribe now")

    fireEvent.click(subscribeButton)

    expect(pushMocked).toHaveBeenCalledWith("/posts")
  })
})