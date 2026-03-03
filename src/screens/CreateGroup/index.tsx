import { useMemo, useState } from 'react'
import * as S from './styled'
import BackgroundScreen from '@src/components/background-screen'
import { Input } from '@src/components/input'
import Button from '@src/components/button'
import ButtonIcon from '@src/components/button-icon'
import { theme } from '@src/../theme'
import { useAppNavigation, useGroups } from '@src/hooks'
import { ProductColorKey } from '@src/@types/group'

const colorOptions: Array<{ key: ProductColorKey; value: string }> = [
  { key: 'green_700', value: theme.product.green_700 },
  { key: 'green_500', value: theme.product.green_500 },
  { key: 'purple_700', value: theme.product.purple_700 },
  { key: 'purple_500', value: theme.product.purple_500 },
  { key: 'blue_700', value: theme.product.blue_700 },
  { key: 'blue_500', value: theme.product.blue_500 },
  { key: 'red_700', value: theme.product.red_700 },
  { key: 'red_500', value: theme.product.red_500 },
  { key: 'yellow_700', value: theme.product.yellow_700 },
  { key: 'yellow_500', value: theme.product.yellow_500 },
  { key: 'orange_700', value: theme.product.orange_700 },
  { key: 'orange_500', value: theme.product.orange_500 },
  { key: 'pink_700', value: theme.product.pink_700 },
  { key: 'pink_500', value: theme.product.pink_500 },
]

export default function CreateGroup() {
  const navigation = useAppNavigation()
  const { createGroup } = useGroups()
  const [name, setName] = useState('')
  const [selectedColorKey, setSelectedColorKey] = useState<ProductColorKey>(
    colorOptions[0].key,
  )

  const isValid = useMemo(() => name.trim().length > 0, [name])

  async function onSubmit() {
    try {
      await createGroup({
        name: name.trim(),
        colorKey: selectedColorKey,
      })
      navigation.goBack()
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Erro ao criar grupo:', error)
    }
  }

  return (
    <BackgroundScreen isStackPage>
      <S.HeaderRow>
        <ButtonIcon
          icon="arrow-back"
          variant="ghost"
          onPress={() => navigation.goBack()}
        />
      </S.HeaderRow>

      <S.Field>
        <Input
          placeholder="Nome do grupo"
          value={name}
          onChangeText={setName}
        />
      </S.Field>

      <S.SectionTitle>Cor do grupo</S.SectionTitle>

      <S.ColorGrid>
        {colorOptions.map((color) => (
          <S.ColorButton
            key={color.key}
            color={color.value}
            selected={selectedColorKey === color.key}
            onPress={() => setSelectedColorKey(color.key)}
          />
        ))}
      </S.ColorGrid>

      <Button title="Salvar" onPress={onSubmit} variant={isValid ? 'primary' : 'outline'} />
    </BackgroundScreen>
  )
}
