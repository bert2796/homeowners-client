import {
  Box,
  Button,
  createStyles,
  Group,
  Image,
  SimpleGrid,
  Text,
} from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconCloudUpload, IconDownload, IconX } from '@tabler/icons';
import React from 'react';

type Props = {
  files: FileWithPath[];
  onSetFiles: (files: FileWithPath[]) => void;
};

export const ImageUploader: React.FC<Props> = ({ files, onSetFiles }) => {
  const { classes, theme } = useStyles();
  const openRef = React.useRef<() => void>(null);

  return (
    <>
      <div className={classes.wrapper}>
        <Dropzone
          accept={IMAGE_MIME_TYPE}
          className={classes.dropzone}
          maxSize={30 * 1024 ** 2}
          openRef={openRef}
          radius="md"
          onDrop={onSetFiles}
        >
          <div style={{ pointerEvents: 'none' }}>
            <Group position="center">
              <Dropzone.Accept>
                <IconDownload
                  color={theme.colors[theme.primaryColor][6]}
                  size={50}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX color={theme.colors.red[6]} size={50} stroke={1.5} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconCloudUpload
                  color={
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[0]
                      : theme.black
                  }
                  size={50}
                  stroke={1.5}
                />
              </Dropzone.Idle>
            </Group>

            <Text align="center" mt="xl" size="lg" weight={700}>
              <Dropzone.Accept>Drop files here</Dropzone.Accept>
              <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
              <Dropzone.Idle>Upload proof of payment</Dropzone.Idle>
            </Text>
            <Text align="center" color="dimmed" mt="xs" size="sm">
              Drag&apos;n&apos;drop files here to upload. We can accept only{' '}
              <i>.pdf</i> files that are less than 30mb in size.
            </Text>
          </div>
        </Dropzone>

        <Button
          className={classes.control}
          radius="xl"
          size="md"
          onClick={() => openRef.current?.()}
        >
          {files.length ? 'Change' : 'Select'} files
        </Button>
      </div>

      {Boolean(files.length) && (
        <Box>
          <Text size="md" weight="bold">
            Uploaded Files ({files.length} items):
          </Text>

          <SimpleGrid
            breakpoints={[{ cols: 1, maxWidth: 'sm' }]}
            cols={4}
            mb="lg"
            mt={files.length > 0 ? 'xl' : 0}
          >
            {files.map((file, index) => {
              const imageUrl = URL.createObjectURL(file);

              return (
                <Box key={index}>
                  <Image
                    alt="image"
                    height={150}
                    imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
                    mb="sm"
                    src={imageUrl}
                    width={180}
                  />
                  <Text>{file.name}</Text>
                </Box>
              );
            })}
          </SimpleGrid>
        </Box>
      )}
    </>
  );
};

const useStyles = createStyles((theme) => ({
  control: {
    bottom: -20,
    left: 'calc(50% - 125px)',
    position: 'absolute',
    width: 250,
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,
  },

  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  wrapper: {
    marginBottom: 60,
    position: 'relative',
  },
}));
