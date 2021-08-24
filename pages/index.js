import { useState } from 'react'
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
    const [form, setForm] = useState({
        color: {
            hue: 120,
            brightness: 1,
            saturation: 1,
        },
    })
    return (
        <Page>
            <Form onSubmit={() => console.log(form)}>
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
                                    value={form.title}
                                    onChange={(title) =>
                                        setForm({ ...form, title })
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
                                    color={form.color}
                                    onChange={(color) =>
                                        setForm({ ...form, color })
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
