import { useEffect, useState, useContext } from 'react'
import { authenticatedFetch } from '@shopify/app-bridge-utils'
import { Provider, useAppBridge } from '@shopify/app-bridge-react'
import { FetchContext } from './_app'
import {
    Heading,
    Page,
    Form,
    FormLayout,
    TextField,
    SettingToggle,
    ColorPicker,
    Button,
    Layout,
    Card,
} from '@shopify/polaris'

const Index = () => {
    const fetchFunction = useContext(FetchContext)
    const [form, setForm] = useState()

    useEffect(() => {
        fetchFunction('/api/shop', { credentials: 'include' })
            .then((res) => res.json())
            .then((res) => setForm(res))
    }, [])

    if (!form) {
        return 'Loading'
    }

    return (
        <Page>
            <Form
                onSubmit={() => {
                    fetchFunction('/api/shop', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                        body: JSON.stringify(form),
                    })
                }}
            >
                <Heading>Application Settings</Heading>
                <FormLayout>
                    <Layout.AnnotatedSection
                        title="Application Settings"
                        description="Change these to suit your shop"
                    >
                        <FormLayout>
                            <Card sectioned>
                                <TextField
                                    label="Question Title"
                                    type="text"
                                    value={form.question}
                                    onChange={(question) =>
                                        setForm({ ...form, question })
                                    }
                                    helpText="We’ll use this as the question title we ask your customers"
                                />
                            </Card>
                            <SettingToggle
                                value={form.enabled}
                                action={{
                                    onAction: () =>
                                        setForm({
                                            ...form,
                                            enabled: !form.enabled,
                                        }),
                                    content: form.enabled
                                        ? 'Deactivate'
                                        : 'Activate',
                                }}
                            >
                                {form.enabled
                                    ? 'The application is enabled. The popup will display on your shop'
                                    : 'The application is disabled. The popup will not display on your shop.'}
                            </SettingToggle>
                            <Card sectioned title="Button Color">
                                <ColorPicker
                                    color={form.buttonColor}
                                    onChange={(buttonColor) =>
                                        setForm({ ...form, buttonColor })
                                    }
                                />
                            </Card>
                        </FormLayout>
                    </Layout.AnnotatedSection>
                    <Layout.AnnotatedSection
                        title="Options"
                        description="These labels will be used as the answers to your question title"
                    >
                        <Card sectioned>
                            <FormLayout>
                                <TextField
                                    label="Answer A"
                                    type="text"
                                    value={form.answerA}
                                    onChange={(answerA) =>
                                        setForm({ ...form, answerA })
                                    }
                                />

                                <TextField
                                    label="Answer B"
                                    type="text"
                                    value={form.answerB}
                                    onChange={(answerB) =>
                                        setForm({ ...form, answerB })
                                    }
                                />

                                <TextField
                                    label="Answer C"
                                    type="text"
                                    value={form.answerC}
                                    onChange={(answerC) =>
                                        setForm({ ...form, answerC })
                                    }
                                />
                            </FormLayout>
                        </Card>
                    </Layout.AnnotatedSection>
                    <Layout.AnnotatedSection>
                        <Button primary submit>
                            Submit
                        </Button>
                    </Layout.AnnotatedSection>
                </FormLayout>
            </Form>
        </Page>
    )
}

export default Index
