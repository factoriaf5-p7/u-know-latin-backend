import { Test, TestingModule } from '@nestjs/testing';
import { SchemaTypes } from 'mongoose';
import { ContentService } from './content.service';
import { Content } from '../schemas/content.schema';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';


const contents = [
  {
    id: '124',
    title: 'AprendiendoCss',
    description: 'Aprenderas en pocos pasos todo lo relacionado a css',
    price: 10.99,
    created_at: new Date('2023-06-15'),
    update: new Date('2023-06-15'),
    category: 'CSS',
    dificulty: 1,
    sales: true,
    content: 'Lorem ipsum dolor sit amet...',
  },
];

describe('ContentService', () => {
  let service: ContentService;
  const mockContentModel = {
    findAll: jest.fn().mockReturnValue(Promise.resolve(contents)),
    create: jest
      .fn()
      .mockImplementation((createContentDto: CreateContentDto) => {
        const newContent = {
          id: 'ObjectId',
          ...createContentDto,
        };
        contents.push(newContent);
        return Promise.resolve(newContent);
      }),
      delete:jest.fn().mockReturnValue(contents[0]),
      update:jest.fn().mockImplementation((contentId:string,updateContentDto:UpdateContentDto) =>{
        const updatedContent = {
          id:contentId,
          ...updateContentDto
        }
        const index = contents.findIndex((content) => content.id === contentId);
        if(index !== -1){
          return Promise.resolve(updatedContent)
        }else{
          return Promise.resolve(null);
        }
      })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentService],
     })
          .overrideProvider(ContentService)
          .useValue(mockContentModel)
          .compile();
        
          service = module.get<ContentService>(ContentService);
    });
    it('should be defined', () => {
      expect(service).toBeDefined();
  });
   
  it('should return a content list of array "contents"', async () => {
    expect(await service.findAll()).toMatchObject(contents);
  });

  it('should create an content', async () => {
    const newContent = {
      id: '124',
      title: 'AprendiendoCss',
      description: 'Aprenderas en pocos pasos todo lo relacionado a css',
      price: 10.99,
      created_at: new Date('2023-06-15'),
      update: new Date('2023-06-15'),
      category: 'CSS',
      dificulty: 1,
      sales: true,
      content: 'Lorem ipsum dolor sit amet...',
    }
    expect(await service.create(newContent)).toMatchObject({
       id:expect.any(String),
    }); 
  });
  it('should updated a content',async ()=>{
    const contentId = '124';
    const updateContent = {title:'Updated content'};
    const updatedContent = await service.update(contentId,updateContent)
    expect(updatedContent).toEqual({
      id:contentId,
      title:'Updated content'
    });
  });
  it('should delete a content',async () => {
    const contentId = 'ObjectId'
    const deletedContent = await service.delete(contentId);
    expect(deletedContent).toMatchObject({
      id: '124',
      title: 'AprendiendoCss',
      description: 'Aprenderas en pocos pasos todo lo relacionado a css',
      price: 10.99,
      created_at: new Date('2023-06-15'),
      update: new Date('2023-06-15'),
      category: 'CSS',
      dificulty: 1,
      sales: true,
      content: 'Lorem ipsum dolor sit amet...',
    },)
  });
});
